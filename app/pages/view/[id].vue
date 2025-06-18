<script setup lang="ts">
const route = useRoute();
const id = route.params.id as string;
const message = ref('');
const loading = ref(true);
const error = ref('');
const revealed = ref(false);
const copied = ref(false);
const accessKey = ref('');
const messageDeleted = ref(false);

// Select a random color from the array
const colors = [
  '#f87171',
  '#fb923c',
  '#fbbf24',
  '#facc15',
  '#a3e635',
  '#4ade80',
  '#34d399',
  '#2dd4bf',
  '#22d3ee',
  '#38bdf8',
  '#60a5fa',
  '#818cf8',
  '#a78bfa',
  '#c084fc',
  '#e879f9',
  '#f472b6',
  '#fb7185',
];

// Select a random color and define CSS variables for it
const colorIndex = Math.floor(Math.random() * colors.length);
const color = useState('color', () => colors[colorIndex]);
const colorRgb = useState('colorRgb', () => {
  return hexToRgb(colors[colorIndex] || '#60a5fa') || '75, 85, 99';
});

const accentColorIndex = (colorIndex + 8) % colors.length;
const accentColor = useState('accentColor', () => colors[accentColorIndex]);
const accentColorRgb = useState('accentColorRgb', () => {
  return hexToRgb(colors[accentColorIndex] || '#10b981') || '16, 185, 129';
});

// Convert hex to RGB for CSS variables
function hexToRgb(hex: string): string | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result && result[1] && result[2] && result[3]
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}`
    : null;
}

// Import crypto functions for client-side decryption
import { decrypt } from '../../../server/utils/crypto';

onMounted(async () => {
  try {
    // Check if crypto is available
    if (typeof crypto === 'undefined' || !crypto.subtle) {
      error.value =
        'Your browser does not support the required encryption features. Please use a modern browser with Web Crypto API support.';
      loading.value = false;
      return;
    }

    // Get the access key from the URL fragment with better mobile compatibility
    if (typeof window !== 'undefined') {
      // Add a small delay to ensure the window is fully loaded on mobile
      await new Promise((resolve) => setTimeout(resolve, 100));

      accessKey.value = window.location.hash.substring(1);
    }

    if (!accessKey.value) {
      error.value =
        'Missing decryption key. Please use the complete secure link.';
      loading.value = false;
      return;
    }

    // Retrieve the encrypted message data from the server
    const response = await $fetch<{
      encrypted: string;
      iv: string;
      salt: string;
      authTag: string;
      requiresDecryption: boolean;
      id: string;
    }>(`/api/retrieve/${id}`);

    if (response.requiresDecryption) {
      try {
        // Decrypt the message using the access key from the URL fragment
        const decryptedMessage = await decrypt(
          response.encrypted,
          response.iv,
          response.salt,
          response.authTag,
          accessKey.value
        );

        message.value = decryptedMessage;
      } catch (decryptError) {
        error.value =
          'Failed to decrypt the message. The access key may be invalid or your browser may not support the required encryption features.';
      }
    } else {
      // Handle non-encrypted response (should never happen in practice)
      message.value = 'Message could not be decrypted';
      error.value = 'Invalid message format received from server';
    }

    error.value = '';
  } catch (err: any) {
    if (err.response?.status === 404) {
      error.value = 'This data has either been viewed already or has expired.';
    } else if (err.name === 'NetworkError' || err.message?.includes('fetch')) {
      error.value =
        'Network error. Please check your internet connection and try again.';
    } else {
      error.value = 'Failed to retrieve secure data. Please try again.';
    }
  } finally {
    loading.value = false;
  }
});

function toggleReveal() {
  if (!revealed.value && !messageDeleted.value) {
    // Delete the message when it's first revealed
    $fetch(`/api/delete/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        messageDeleted.value = true;
      })
      .catch((err) => {
        // Message deletion failed - this is not critical for user experience
        // The message will expire automatically after 24h
      });
  }

  revealed.value = !revealed.value;
}

function copyMessage() {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard
      .writeText(message.value)
      .then(() => {
        copied.value = true;
        setTimeout(() => {
          copied.value = false;
        }, 2000);
      })
      .catch((err) => {
        console.error('Failed to copy message:', err);
        // Fallback for older mobile browsers
        fallbackCopyTextToClipboard(message.value);
      });
  } else {
    // Fallback for browsers without clipboard API
    fallbackCopyTextToClipboard(message.value);
  }
}

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

// Retry loading the message
function retryLoad() {
  error.value = '';
  loading.value = true;

  // Reload the page to retry the entire process
  if (typeof window !== 'undefined') {
    window.location.reload();
  }
}

useHead({
  title: 'GhostData - Secure Message Viewer',
  meta: [
    {
      name: 'description',
      content:
        'View secure encrypted messages from GhostData. Messages self-destruct after viewing.',
    },
  ],
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white"
    :style="{
      '--theme-color': color,
      '--theme-rgb': colorRgb,
      '--accent-color': accentColor,
      '--accent-rgb': accentColorRgb,
    }"
  >
    <!-- Hero Header -->
    <div class="w-full relative overflow-hidden">
      <div class="absolute inset-0 z-0">
        <div
          class="absolute top-0 right-0 w-1/2 h-1/2 bg-theme-color/5 rounded-full filter blur-3xl transform translate-x-1/4 -translate-y-1/4"
        ></div>
        <div
          class="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent-color/5 rounded-full filter blur-3xl transform -translate-x-1/4 translate-y-1/4"
        ></div>
      </div>

      <div
        class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10"
      >
        <div class="flex items-center justify-center">
          <div class="text-center">
            <div
              class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-lg mb-6 border border-gray-700/50"
            >
              <div
                class="h-2 w-2 rounded-full bg-accent-color animate-pulse"
              ></div>
              <span class="text-sm font-medium text-gray-300"
                >Secure Message Viewer</span
              >
            </div>

            <h1 class="text-3xl md:text-4xl font-bold mb-4">
              <span
                class="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 flex items-center justify-center"
              >
                <Icon name="ph:ghost" class="mr-3 w-8 h-8 animate-float" />
                GhostData
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <!-- Message Viewer Section -->
      <div class="relative z-10 -mt-8">
        <div
          class="backdrop-blur-lg bg-gray-900/80 rounded-2xl shadow-2xl overflow-hidden border border-gray-800 transition-all duration-500 theme-shadow"
        >
          <div class="p-8">
            <!-- Loading State -->
            <div
              v-if="loading"
              class="flex flex-col items-center justify-center py-12"
            >
              <div class="relative w-16 h-16 mb-6">
                <div
                  class="absolute inset-0 rounded-full border-4 border-gray-700 opacity-30"
                ></div>
                <div
                  class="absolute inset-0 rounded-full border-t-4 border-theme-color opacity-80 animate-spin"
                ></div>
              </div>
              <h3 class="text-xl font-medium text-white mb-2">
                Decrypting Your Message
              </h3>
              <p class="text-gray-400">
                Please wait while we securely decrypt your data...
              </p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="py-6">
              <div class="flex items-center gap-4 mb-8">
                <div
                  class="w-12 h-12 rounded-xl bg-red-500/30 flex items-center justify-center backdrop-blur-lg border border-red-800/50"
                >
                  <Icon
                    name="heroicons:exclamation-triangle"
                    class="w-6 h-6 text-red-400"
                  />
                </div>
                <h2 class="text-2xl font-bold text-white">
                  Message Unavailable
                </h2>
              </div>

              <div
                class="p-6 bg-gray-800/50 rounded-xl border border-gray-700 mb-8"
              >
                <p class="text-gray-300 mb-4">{{ error }}</p>

                <!-- Mobile troubleshooting tips -->
                <div
                  v-if="
                    error.includes('crypto') || error.includes('encryption')
                  "
                  class="mt-4 p-4 bg-yellow-900/20 border border-yellow-800/50 rounded-lg"
                >
                  <h4 class="text-yellow-400 font-medium mb-2">
                    Troubleshooting Tips:
                  </h4>
                  <ul class="text-yellow-100 text-sm space-y-1">
                    <li>
                      • Try refreshing the page and accessing the link again
                    </li>
                    <li>
                      • Ensure you're using a modern browser (Chrome, Firefox,
                      Safari, Edge)
                    </li>
                    <li>
                      • Check that you're using the complete secure link with
                      the key
                    </li>
                    <li>
                      • If on mobile, try opening in your default browser
                      instead of an in-app browser
                    </li>
                    <li>
                      • Disable any browser extensions that might interfere with
                      crypto operations
                    </li>
                  </ul>
                </div>

                <!-- 404 / Message not found tips -->
                <div
                  v-if="
                    error.includes('viewed already') ||
                    error.includes('expired')
                  "
                  class="mt-4 p-4 bg-red-900/20 border border-red-800/50 rounded-lg"
                >
                  <h4 class="text-red-400 font-medium mb-2">
                    Message Not Found:
                  </h4>
                  <ul class="text-red-100 text-sm space-y-1">
                    <li>
                      • Messages can only be viewed once and are then
                      permanently deleted
                    </li>
                    <li>• Messages automatically expire after 24 hours</li>
                    <li>
                      • Make sure you're using the complete original link with
                      the #key part
                    </li>
                    <li>
                      • If opening from a social media app, try copying the link
                      and opening it in your main browser
                    </li>
                    <li>
                      • Some in-app browsers may not preserve the full secure
                      link
                    </li>
                  </ul>
                </div>

                <!-- Network error tips -->
                <div
                  v-if="
                    error.includes('Network') || error.includes('connection')
                  "
                  class="mt-4 p-4 bg-blue-900/20 border border-blue-800/50 rounded-lg"
                >
                  <h4 class="text-blue-400 font-medium mb-2">
                    Connection Issues:
                  </h4>
                  <ul class="text-blue-100 text-sm space-y-1">
                    <li>• Check your internet connection</li>
                    <li>• Try switching between WiFi and mobile data</li>
                    <li>• Refresh the page and try again</li>
                  </ul>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row gap-4">
                <button
                  @click="retryLoad"
                  class="flex items-center justify-center gap-2 px-6 py-3 bg-theme-color hover:bg-theme-color/80 text-white rounded-lg transition-colors w-full sm:w-auto"
                >
                  <Icon name="heroicons:arrow-path" class="w-5 h-5" />
                  Try Again
                </button>

                <NuxtLink
                  to="/"
                  class="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors border border-gray-700 w-full sm:w-auto"
                >
                  <Icon name="heroicons:arrow-left" class="w-5 h-5" />
                  Return to Homepage
                </NuxtLink>
              </div>
            </div>

            <!-- Message Success State -->
            <div v-else>
              <div class="flex items-center gap-4 mb-8">
                <div
                  class="w-12 h-12 rounded-xl bg-gradient-to-br from-theme-color/30 to-accent-color/30 flex items-center justify-center backdrop-blur-lg border border-gray-800"
                >
                  <Icon
                    name="heroicons:shield-check"
                    class="w-6 h-6 text-white"
                  />
                </div>
                <h2
                  class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
                >
                  Secure Message Retrieved
                </h2>
              </div>

              <div
                class="p-6 bg-gray-800/30 border border-gray-700 rounded-xl mb-8"
              >
                <div class="flex items-start gap-3 mb-6">
                  <Icon
                    name="heroicons:information-circle"
                    class="w-6 h-6 text-theme-color flex-shrink-0 mt-1"
                  />
                  <p class="text-gray-300">
                    This message will be permanently deleted from our servers
                    after you view it. You will not be able to access it again.
                  </p>
                </div>

                <!-- Message Container -->
                <div
                  class="bg-gray-800/70 rounded-lg border border-gray-700 overflow-hidden mb-2"
                >
                  <div
                    class="flex items-center justify-between border-b border-gray-700 px-4 py-2"
                  >
                    <span class="text-sm font-medium text-gray-400"
                      >Secure Message</span
                    >
                    <div
                      class="text-xs px-2 py-1 rounded-full flex items-center"
                      :class="{
                        'bg-red-900/20 text-red-400': !revealed,
                        'bg-green-900/20 text-green-400': revealed,
                      }"
                    >
                      <Icon
                        :name="
                          revealed ? 'heroicons:eye' : 'heroicons:eye-slash'
                        "
                        class="w-3 h-3 mr-1"
                      />
                      {{ revealed ? 'Revealed' : 'Hidden' }}
                    </div>
                  </div>

                  <div class="p-4">
                    <div
                      v-if="!revealed"
                      class="flex flex-col items-center justify-center p-8 cursor-pointer"
                      @click="toggleReveal"
                    >
                      <div
                        class="w-16 h-16 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center mb-4 hover:bg-gray-700 transition-colors"
                      >
                        <Icon
                          name="heroicons:eye"
                          class="w-8 h-8 text-gray-400"
                        />
                      </div>
                      <p class="text-gray-400 font-medium">
                        Click to reveal sensitive message
                      </p>
                      <p class="text-gray-500 text-sm mt-1">
                        This message will be permanently deleted after viewing
                      </p>
                    </div>

                    <pre
                      v-else
                      class="whitespace-pre-wrap break-all text-gray-300 max-h-60 overflow-auto text-sm p-2 w-full"
                      >{{ message }}</pre
                    >
                  </div>
                </div>

                <p class="text-xs text-gray-500 text-center">
                  For your security, this message is end-to-end encrypted
                </p>
              </div>

              <div class="flex flex-col sm:flex-row gap-4">
                <button
                  v-if="revealed"
                  @click="copyMessage"
                  class="py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 flex justify-center items-center overflow-hidden relative group transition-all duration-300 flex-grow"
                  :class="{
                    'theme-button': !copied,
                    'bg-green-600 hover:bg-green-700': copied,
                  }"
                >
                  <div
                    class="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  ></div>
                  <Icon
                    v-if="copied"
                    name="heroicons:check"
                    class="w-5 h-5 mr-2 text-white"
                  />
                  <Icon
                    v-else
                    name="heroicons:clipboard"
                    class="w-5 h-5 mr-2 text-white"
                  />
                  <span class="text-white font-medium">{{
                    copied ? 'Copied!' : 'Copy Message'
                  }}</span>
                </button>

                <button
                  v-if="!revealed"
                  @click="toggleReveal"
                  class="py-3 px-6 rounded-lg theme-button focus:outline-none focus:ring-2 focus:ring-opacity-50 flex justify-center items-center overflow-hidden relative group transition-all duration-300 flex-grow"
                >
                  <div
                    class="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  ></div>
                  <Icon name="heroicons:eye" class="w-5 h-5 mr-2 text-white" />
                  <span class="text-white font-medium">Reveal Message</span>
                </button>

                <NuxtLink
                  to="/"
                  class="py-3 px-6 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium border border-gray-700 transition-all flex items-center justify-center gap-2 flex-grow-0"
                >
                  <Icon name="heroicons:plus" class="w-5 h-5" />
                  <span>Create New</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Security Features -->
      <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          class="backdrop-blur-lg bg-gray-900/30 rounded-xl border border-gray-800 p-5 flex items-start gap-3"
        >
          <div
            class="w-10 h-10 rounded-full bg-theme-color/20 flex items-center justify-center flex-shrink-0"
          >
            <Icon name="heroicons:key" class="w-5 h-5 text-theme-color" />
          </div>
          <div>
            <h3 class="text-base font-medium text-white mb-1">
              End-to-End Encrypted
            </h3>
            <p class="text-sm text-gray-400">
              Your data is encrypted in your browser and only you have the key
            </p>
          </div>
        </div>

        <div
          class="backdrop-blur-lg bg-gray-900/30 rounded-xl border border-gray-800 p-5 flex items-start gap-3"
        >
          <div
            class="w-10 h-10 rounded-full bg-theme-color/20 flex items-center justify-center flex-shrink-0"
          >
            <Icon name="heroicons:trash" class="w-5 h-5 text-theme-color" />
          </div>
          <div>
            <h3 class="text-base font-medium text-white mb-1">
              Auto-Destruction
            </h3>
            <p class="text-sm text-gray-400">
              Messages are permanently deleted after viewing
            </p>
          </div>
        </div>

        <div
          class="backdrop-blur-lg bg-gray-900/30 rounded-xl border border-gray-800 p-5 flex items-start gap-3"
        >
          <div
            class="w-10 h-10 rounded-full bg-theme-color/20 flex items-center justify-center flex-shrink-0"
          >
            <Icon name="heroicons:eye-slash" class="w-5 h-5 text-theme-color" />
          </div>
          <div>
            <h3 class="text-base font-medium text-white mb-1">
              Zero Knowledge
            </h3>
            <p class="text-sm text-gray-400">
              We can't read your data, even if we wanted to
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --theme-color: #60a5fa;
  --theme-rgb: 96, 165, 250;
  --accent-color: #10b981;
  --accent-rgb: 16, 185, 129;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes pulse-slow {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.6;
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animation-delay-300 {
  animation-delay: 300ms;
}

.animation-delay-600 {
  animation-delay: 600ms;
}

.animation-delay-900 {
  animation-delay: 900ms;
}

.theme-shadow {
  box-shadow: 0 0 40px rgba(var(--theme-rgb), 0.15),
    0 0 20px rgba(var(--theme-rgb), 0.1);
}

.shadow-theme-glow {
  box-shadow: 0 0 20px rgba(var(--theme-rgb), 0.15);
}

.shadow-accent-glow {
  box-shadow: 0 0 20px rgba(var(--accent-rgb), 0.15);
}

.shadow-glow {
  box-shadow: 0 0 30px rgba(var(--theme-rgb), 0.3);
}

.theme-gradient {
  background: linear-gradient(
    145deg,
    rgba(var(--theme-rgb), 0.25),
    rgba(var(--theme-rgb), 0.05)
  );
}

.theme-glow {
  background: var(--theme-color);
  filter: blur(40px);
}

.theme-button {
  background-color: var(--theme-color);
  box-shadow: 0 4px 14px rgba(var(--theme-rgb), 0.33);
}

.theme-button:hover {
  background-color: rgba(var(--theme-rgb), 0.9);
}

.theme-focus-ring:focus {
  --tw-ring-color: rgba(var(--theme-rgb), 0.5);
}

.theme-border {
  border-color: var(--theme-color);
}
</style>
