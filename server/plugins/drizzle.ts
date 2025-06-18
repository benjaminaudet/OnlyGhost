// Import types file is automatically handled by TypeScript

export default defineNitroPlugin(() => {
  try {
    // Use the same database fallback logic as in utils/database.ts
    let db;

    try {
      // Try to get NuxtHub database first
      db = hubDatabase();
    } catch (e) {
      // In development, hubDatabase() might not be available
      // This will fall back to the in-memory storage in utils/database.ts
      return;
    }

    // Create table if not exists (only if real database is available)
    db.exec(`
      CREATE TABLE IF NOT EXISTS secure_messages (
        id TEXT PRIMARY KEY,
        encrypted TEXT NOT NULL,
        iv TEXT NOT NULL,
        salt TEXT NOT NULL,
        auth_tag TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        expires_at INTEGER NOT NULL
      )
    `);
  } catch (error) {
    // Database initialization will fall back to in-memory storage
  }
});
