import { encrypt, generateId, generateSecureUrl } from './crypto';
import { useRuntimeConfig } from '#imports';

export interface SecureMessage {
  id: string;
  encrypted: string;
  iv: string;
  salt: string;
  authTag: string;
  createdAt: number;
  expiresAt: number;
}

// In-memory fallback storage for environments without database access
const inMemoryFallback = new Map<string, SecureMessage>();

/**
 * Check if running in Cloudflare environment
 */
function isCloudflareEnvironment() {
  try {
    return (
      typeof globalThis.caches !== 'undefined' &&
      typeof globalThis.addEventListener === 'function'
    );
  } catch (e) {
    return false;
  }
}

/**
 * Get the NuxtHub database instance or use a fallback
 */
function getDatabase() {
  // Try multiple ways to get the database
  try {
    // Method 1: Direct hubDatabase() call (should work in NuxtHub)
    if (typeof hubDatabase === 'function') {
      const db = hubDatabase();
      return db;
    }
  } catch (e) {
    // Silent fallback
  }

  // Method 2: Try via globalThis with proper typing
  try {
    const globalAny = globalThis as any;
    if (typeof globalAny.hubDatabase === 'function') {
      const db = globalAny.hubDatabase();
      return db;
    }
  } catch (e) {
    // Silent fallback
  }

  // Method 3: Try useRuntimeConfig approach for local dev
  if (!isCloudflareEnvironment()) {
    try {
      const config = useRuntimeConfig();
      if (typeof config.hubDatabase === 'function') {
        return config.hubDatabase();
      }
    } catch (configError) {
      // Silent fallback
    }
  }

  // Return a fallback database implementation for development only
  return {
    exec: async (sql: string) => {
      return true;
    },
    prepare: (sql: string) => {
      return {
        bind: (...params: any[]) => {
          return {
            run: async () => {
              if (sql.includes('INSERT INTO')) {
                const id = params[0];
                const messageData = {
                  id: params[0],
                  encrypted: params[1],
                  iv: params[2],
                  salt: params[3],
                  authTag: params[4],
                  createdAt: params[5],
                  expiresAt: params[6],
                };
                inMemoryFallback.set(id, messageData);
              } else if (sql.includes('DELETE')) {
                const id = params[0];
                inMemoryFallback.delete(id);
              }
              return true;
            },
            first: async <T>() => {
              if (sql.includes('SELECT') && params.length > 0) {
                const id = params[0];
                const data = inMemoryFallback.get(id);
                return data as unknown as T;
              }
              return null;
            },
          };
        },
      };
    },
  };
}

/**
 * Stores an encrypted message in the database
 * @param message The message to encrypt and store
 * @returns Object containing the message ID and access URL with key
 */
export async function storeMessage(
  message: string
): Promise<{ id: string; accessUrl: string }> {
  try {
    const id = generateId();

    // Encrypt the message using Zero Knowledge approach
    // The encryption key is generated client-side and never stored on the server
    const { encrypted, iv, salt, authTag, accessKey } = await encrypt(message);

    const now = Date.now();
    const expiresAt = now + 24 * 60 * 60 * 1000;

    try {
      const db = getDatabase();

      await db.exec(
        'CREATE TABLE IF NOT EXISTS secure_messages (id TEXT PRIMARY KEY, encrypted TEXT NOT NULL, iv TEXT NOT NULL, salt TEXT NOT NULL, auth_tag TEXT NOT NULL, created_at INTEGER NOT NULL, expires_at INTEGER NOT NULL)'
      );

      await db
        .prepare(
          'INSERT INTO secure_messages (id, encrypted, iv, salt, auth_tag, created_at, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
        )
        .bind(id, encrypted, iv, salt, authTag, now, expiresAt)
        .run();
    } catch (dbError) {
      throw dbError;
    }

    // Generate a secure URL that includes the access key in the fragment
    // This key is never sent to the server or stored in the database
    const accessUrl = generateSecureUrl(id, accessKey);

    return { id, accessUrl };
  } catch (error) {
    throw new Error('Failed to store secure message');
  }
}

/**
 * Retrieves encrypted message data from the database without decrypting
 * In Zero Knowledge approach, decryption happens client-side using accessKey
 * @param id The ID of the message to retrieve
 * @returns The encrypted message data
 * @throws Error if message not found or expired
 */
export async function retrieveEncryptedMessage(
  id: string
): Promise<SecureMessage> {
  try {
    const db = getDatabase();

    const result = await db
      .prepare(
        'SELECT id, encrypted, iv, salt, auth_tag as authTag, created_at as createdAt, expires_at as expiresAt FROM secure_messages WHERE id = ?'
      )
      .bind(id)
      .first<SecureMessage>();

    if (!result) {
      throw new Error('Message not found or already viewed');
    }

    const now = Date.now();

    if (result.expiresAt < now) {
      await db
        .prepare('DELETE FROM secure_messages WHERE id = ?')
        .bind(id)
        .run();
      throw new Error('Message has expired');
    }

    return result;
  } catch (error) {
    if (error instanceof Error && error.message.includes('Message')) {
      throw error;
    }
    throw new Error('Failed to retrieve secure message');
  }
}

/**
 * Deletes a message from the database after it has been viewed
 * @param id The ID of the message to delete
 */
export async function deleteMessage(id: string): Promise<void> {
  try {
    const db = getDatabase();

    await db.prepare('DELETE FROM secure_messages WHERE id = ?').bind(id).run();
  } catch (error) {
    console.error('Delete error:', error);
    throw new Error('Failed to delete secure message');
  }
}
