/**
 * Generates random bytes and returns them as a hex string
 * @param length Number of bytes to generate
 * @returns Hex string of the random bytes
 */
function getRandomBytes(length: number): string {
  // Check if crypto is available
  if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
    throw new Error('Web Crypto API is not available in this browser');
  }

  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Derives a key using PBKDF2
 * @param password The password or base string
 * @param salt Salt for key derivation
 * @param iterations Number of iterations (default: 100000)
 * @returns Derived key
 */
async function deriveKey(
  password: string,
  salt: string,
  iterations: number = 100000
): Promise<CryptoKey> {
  // Check if crypto.subtle is available
  if (typeof crypto === 'undefined' || !crypto.subtle) {
    throw new Error(
      'Web Crypto API (crypto.subtle) is not available in this browser'
    );
  }

  const encoder = new TextEncoder();
  const passwordData = encoder.encode(password);
  const saltData = new Uint8Array(
    salt.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
  );

  // Import the password as a key
  const baseKey = await crypto.subtle.importKey(
    'raw',
    passwordData,
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );

  // Derive a key using PBKDF2
  return await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltData,
      iterations: iterations,
      hash: 'SHA-256',
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * ZERO KNOWLEDGE IMPLEMENTATION
 *
 * How it works:
 * 1. All encryption/decryption happens in the browser (client-side)
 * 2. The server never sees the original message, only the encrypted data
 * 3. The encryption key is derived from:
 *    - A random access key generated for each message
 *    - Never stored on the server or accessible to administrators
 * 4. The URL to access the message contains the decryption key as a fragment
 *    - The fragment (#) part never gets sent to the server
 * 5. Once a message is read, it's permanently deleted
 * 6. No logs are kept of who created or accessed messages
 */

/**
 * Encrypts a message using Zero Knowledge approach
 * @param message Message to encrypt
 * @returns Object containing encrypted data and access key
 */
export async function encrypt(message: string): Promise<{
  encrypted: string;
  iv: string;
  salt: string;
  authTag: string;
  accessKey: string; // Client-side access key - never stored on server
}> {
  // Generate completely random access key (never stored on server)
  const accessKey = getRandomBytes(32);

  // Generate random salt and initialization vector
  const salt = getRandomBytes(16);
  const iv = getRandomBytes(16);

  // Convert hex to ArrayBuffer
  const ivArray = new Uint8Array(
    iv.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
  );

  // Derive key using PBKDF2 with the access key
  // The server doesn't have access to this key
  const cryptoKey = await deriveKey(accessKey, salt);

  // Encrypt the message
  const encoder = new TextEncoder();
  const messageData = encoder.encode(message);
  const encryptedData = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: ivArray,
    },
    cryptoKey,
    messageData
  );

  // Convert encrypted data to hex
  const encryptedArray = new Uint8Array(encryptedData);
  const encryptedLength = encryptedArray.length;

  // Extract auth tag (last 16 bytes)
  const authTagLength = 16;
  const authTagArray = encryptedArray.slice(encryptedLength - authTagLength);
  const encryptedContent = encryptedArray.slice(
    0,
    encryptedLength - authTagLength
  );

  const encrypted = Array.from(encryptedContent)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  const authTag = Array.from(authTagArray)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return {
    encrypted,
    iv,
    salt,
    authTag,
    accessKey, // Client-side key, never stored on server
  };
}

/**
 * Decrypts an encrypted message using client-provided access key
 * @param encrypted Encrypted message in hex format
 * @param iv Initialization vector in hex format
 * @param salt Salt in hex format
 * @param authTag Authentication tag in hex format
 * @param accessKey Client-provided access key (from URL fragment)
 * @returns Decrypted message
 */
export async function decrypt(
  encrypted: string,
  iv: string,
  salt: string,
  authTag: string,
  accessKey: string // This comes from the URL fragment, not from the server
): Promise<string> {
  // Convert hex to Uint8Array
  const ivArray = new Uint8Array(
    iv.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
  );

  const encryptedArray = new Uint8Array(
    encrypted.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
  );

  const authTagArray = new Uint8Array(
    authTag.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
  );

  // Combine encrypted content and auth tag
  const fullEncrypted = new Uint8Array(
    encryptedArray.length + authTagArray.length
  );
  fullEncrypted.set(encryptedArray);
  fullEncrypted.set(authTagArray, encryptedArray.length);

  // Derive key using PBKDF2 with the access key provided by the client
  const cryptoKey = await deriveKey(accessKey, salt);

  // Decrypt the message
  const decryptedData = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: ivArray,
    },
    cryptoKey,
    fullEncrypted
  );

  // Convert decrypted data to string
  const decoder = new TextDecoder();
  return decoder.decode(decryptedData);
}

/**
 * Generates a random ID for the message
 * @returns Random ID
 */
export function generateId(): string {
  return getRandomBytes(16);
}

/**
 * Generates a secure one-time URL that includes:
 * - Base URL
 * - Message ID (sent to server)
 * - Access key (only in URL fragment, never sent to server)
 *
 * @param messageId Message ID stored on server
 * @param accessKey Access key for decryption (never stored on server)
 * @param baseUrl Base URL of the application
 * @returns A shareable URL with access key in the fragment
 */
export function generateSecureUrl(
  messageId: string,
  accessKey: string,
  baseUrl: string = ''
): string {
  return `${baseUrl}/view/${messageId}#${accessKey}`;
}

/**
 * Extracts message ID and access key from a secure URL
 * @param url The secure URL
 * @returns Object containing messageId and accessKey
 */
export function parseSecureUrl(url: string): {
  messageId: string;
  accessKey: string;
} {
  const urlObj = new URL(url);
  const pathParts = urlObj.pathname.split('/');
  const messageId = pathParts[pathParts.length - 1];
  const accessKey = urlObj.hash.substring(1); // Remove the # character

  return { messageId, accessKey };
}
