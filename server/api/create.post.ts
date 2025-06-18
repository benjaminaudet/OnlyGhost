import { H3Event } from 'h3';
import { storeMessage } from '../utils/database';

export default defineEventHandler(async (event: H3Event) => {
  try {
    // Get request body
    const body = await readBody(event);

    // Validate input
    if (!body.message || typeof body.message !== 'string') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid message format',
      });
    }

    // Validate message size (limit to 100KB)
    if (body.message.length > 100000) {
      throw createError({
        statusCode: 413,
        statusMessage: 'Message too large - maximum size is 100KB',
      });
    }

    // Basic content validation - prevent obvious script injection attempts
    if (
      body.message.includes('<script') ||
      body.message.includes('javascript:')
    ) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid content detected',
      });
    }

    // Validate minimum message length
    if (body.message.trim().length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Message cannot be empty',
      });
    }

    // Store the message - now returns both id and accessUrl
    const result = await storeMessage(body.message);

    // Return the message ID and access URL
    return {
      id: result.id,
      accessUrl: result.accessUrl,
    };
  } catch (error: any) {
    console.error('Error creating secure message:', error);

    // Return appropriate error
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create secure message',
    });
  }
});
