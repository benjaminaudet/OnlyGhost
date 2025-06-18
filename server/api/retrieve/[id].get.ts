import { H3Event } from 'h3';
import { retrieveEncryptedMessage, deleteMessage } from '../../utils/database';

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

    // Retrieve the encrypted message - in Zero Knowledge model,
    // we don't decrypt on the server side, just return the encrypted data
    const encryptedMessage = await retrieveEncryptedMessage(id);

    // Return the encrypted message data for client-side decryption
    return {
      encrypted: encryptedMessage.encrypted,
      iv: encryptedMessage.iv,
      salt: encryptedMessage.salt,
      authTag: encryptedMessage.authTag,
      // Add a flag to indicate this is for client decryption
      requiresDecryption: true,
      // Add message ID to allow deletion after reading
      id: encryptedMessage.id,
    };
  } catch (error: any) {
    // Check if the error is due to the message not being found
    if (
      error.message === 'Message not found or already viewed' ||
      error.message === 'Message has expired'
    ) {
      throw createError({
        statusCode: 404,
        statusMessage: error.message,
      });
    }

    // Return generic error for other issues
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve secure message',
    });
  }
});
