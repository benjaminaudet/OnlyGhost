<script setup lang="ts">
interface Props {
  shareLink: string;
  copied: boolean;
  showQrCode: boolean;
}

interface Emits {
  (e: 'copy-link'): void;
  (e: 'reset-form'): void;
  (e: 'toggle-qr'): void;
}

const props = defineProps<Props>();
defineEmits<Emits>();

// Computed property for full URL
const fullShareUrl = computed(() => {
  if (typeof window !== 'undefined') {
    return window.location.origin + props.shareLink;
  }
  return props.shareLink;
});
</script>

<template>
  <div class="transition-opacity duration-300">
    <div class="flex items-center gap-4 mb-8">
      <div
        class="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-color/30 to-accent-color/50 flex items-center justify-center backdrop-blur-lg border border-gray-800"
      >
        <Icon name="heroicons:check" class="w-6 h-6 text-white" />
      </div>
      <h2
        class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
      >
        Link Generated
      </h2>
    </div>

    <div class="mb-8 p-6 rounded-lg border border-gray-700 bg-gray-800/30">
      <h3 class="text-lg font-medium text-white mb-2">
        Share this link with your recipient
      </h3>
      <p class="text-gray-300 mb-4">
        The decryption key is only in the URL fragment and never transmitted to
        our servers.
      </p>

      <div
        class="p-3 bg-gray-800 rounded-lg flex items-center justify-between border border-gray-700 mb-2"
      >
        <div class="text-gray-300 text-sm truncate mr-2">
          {{ fullShareUrl }}
        </div>
        <button
          @click="$emit('copy-link')"
          class="p-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
          :class="{ 'bg-green-600 hover:bg-green-700': copied }"
        >
          <Icon
            v-if="copied"
            name="heroicons:check"
            class="w-5 h-5 text-white"
          />
          <Icon
            v-else
            name="heroicons:clipboard-document"
            class="w-5 h-5 text-white"
          />
        </button>
      </div>

      <div class="text-xs text-gray-400 mb-4">
        This link will expire in 24 hours if not viewed.
      </div>

      <!-- QR Code Section -->
      <div class="border-t border-gray-700 pt-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h4 class="text-lg font-medium text-white mb-1">QR Code</h4>
            <p class="text-sm text-gray-400">Scan to access the secure link</p>
          </div>
          <button
            @click="$emit('toggle-qr')"
            class="px-4 py-2 text-sm rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors flex items-center gap-2 border border-gray-600"
          >
            <Icon
              :name="showQrCode ? 'heroicons:eye-slash' : 'heroicons:eye'"
              class="w-4 h-4"
            />
            {{ showQrCode ? 'Hide' : 'Show' }}
          </button>
        </div>

        <div v-if="showQrCode" class="transition-all duration-500 ease-in-out">
          <div class="relative">
            <!-- QR Code Container -->
            <div class="flex justify-center">
              <div
                class="relative p-6 bg-white rounded-xl shadow-lg border-2 border-gray-200"
              >
                <!-- Decorative corners -->
                <div
                  class="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-theme-color rounded-tl"
                ></div>
                <div
                  class="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-theme-color rounded-tr"
                ></div>
                <div
                  class="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-theme-color rounded-bl"
                ></div>
                <div
                  class="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-theme-color rounded-br"
                ></div>

                <Qrcode
                  :value="fullShareUrl"
                  :black-color="'#000000'"
                  :white-color="'#ffffff'"
                  class="w-56 h-56"
                />
              </div>
            </div>

            <!-- Info Text -->
            <div class="mt-4 text-center">
              <p class="text-sm text-gray-300 mb-2">
                Point your camera at the QR code to access the secure link
              </p>
              <div
                class="flex items-center justify-center gap-2 text-xs text-gray-400"
              >
                <Icon
                  name="heroicons:shield-check"
                  class="w-4 h-4 text-theme-color"
                />
                <span>End-to-end encrypted • Auto-expires in 24h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row gap-4">
      <button
        @click="$emit('copy-link')"
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
          copied ? 'Copied!' : 'Copy Link'
        }}</span>
      </button>

      <button
        @click="$emit('reset-form')"
        class="py-3 px-6 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium border border-gray-700 transition-all flex items-center justify-center gap-2 flex-grow-0"
      >
        <Icon name="heroicons:arrow-path" class="w-5 h-5" />
        <span>Create New</span>
      </button>
    </div>
  </div>
</template>
