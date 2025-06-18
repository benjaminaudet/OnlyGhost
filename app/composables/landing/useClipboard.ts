export const useClipboard = () => {
  const copied = ref(false);
  const error = ref('');

  // Fallback copy function for mobile browsers without clipboard API
  function fallbackCopyTextToClipboard(text: string) {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        copied.value = true;
        setTimeout(() => {
          copied.value = false;
        }, 2000);
      }
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  }

  function copyToClipboard(text: string) {
    if (typeof window !== 'undefined') {
      // Security check: warn if not using HTTPS in production
      if (
        !window.location.protocol.startsWith('https') &&
        window.location.hostname !== 'localhost'
      ) {
        error.value =
          'Warning: Secure links should only be shared over HTTPS connections. Your data may be at risk.';
        return;
      }

      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            copied.value = true;
            setTimeout(() => {
              copied.value = false;
            }, 2000);
          })
          .catch((err) => {
            console.error('Failed to copy link:', err);
            // Fallback for older mobile browsers
            fallbackCopyTextToClipboard(text);
          });
      } else {
        // Fallback for browsers without clipboard API
        fallbackCopyTextToClipboard(text);
      }
    }
  }

  return {
    copied,
    error,
    copyToClipboard,
  };
};
