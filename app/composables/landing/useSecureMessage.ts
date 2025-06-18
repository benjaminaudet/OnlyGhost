export const useSecureMessage = () => {
  const message = ref('');
  const loading = ref(false);
  const shareLink = ref('');
  const error = ref('');

  async function generateLink() {
    if (!message.value.trim()) {
      error.value = 'Please enter a message to share';
      return;
    }

    if (typeof crypto === 'undefined' || !crypto.subtle) {
      error.value =
        'Your browser does not support the required encryption features. Please use a modern browser with Web Crypto API support.';
      return;
    }

    error.value = '';
    loading.value = true;

    try {
      const response = await $fetch<{ id: string; accessUrl: string }>(
        '/api/create',
        {
          method: 'POST',
          body: { message: message.value },
        }
      );

      shareLink.value = response.accessUrl;
      message.value = '';
    } catch (err: any) {
      if (err.name === 'NetworkError' || err.message?.includes('fetch')) {
        error.value =
          'Network error. Please check your internet connection and try again.';
      } else if (
        err.message?.includes('crypto') ||
        err.message?.includes('Crypto')
      ) {
        error.value =
          'Encryption error. Your browser may not fully support the required security features.';
      } else {
        error.value = 'Failed to create secure message. Please try again.';
      }
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  function resetForm() {
    shareLink.value = '';
    message.value = '';
    error.value = '';
  }

  return {
    message,
    loading,
    shareLink,
    error,
    generateLink,
    resetForm,
  };
};
