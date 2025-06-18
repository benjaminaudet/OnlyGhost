import { H3Event } from 'h3';
import { deleteMessage } from '../../utils/database';

export default defineEventHandler(async (event: H3Event) => {
  try {
    // Get the message ID from the route params
    const id = getRouterParam(event, 'id');

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing message ID',
      });
    }

    // Delete the message after it has been read
    await deleteMessage(id);

    // Return success
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting secure message:', error);

    // Return generic error
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete secure message',
    });
  }
});
