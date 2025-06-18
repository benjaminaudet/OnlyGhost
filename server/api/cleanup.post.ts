export default defineEventHandler(async (event) => {
  try {
    // Get database instance
    const db = hubDatabase();

    // Delete all expired messages
    const now = Date.now();
    const result = await db
      .prepare('DELETE FROM secure_messages WHERE expires_at < ?')
      .bind(now)
      .run();

    return {
      success: true,
      deletedCount: result.meta?.changes || 0,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to cleanup expired messages',
    });
  }
});
