<script setup lang="ts">
import { useSecureMessage } from '~/composables/landing/useSecureMessage';
import { useClipboard } from '~/composables/landing/useClipboard';

const { message, loading, shareLink, error, generateLink, resetForm } =
  useSecureMessage();
const { copied, copyToClipboard } = useClipboard();
const showQrCode = ref(true);

// Computed property for full URL
const fullShareUrl = computed(() => {
  if (typeof window !== 'undefined') {
    return window.location.origin + shareLink.value;
  }
  return shareLink.value;
});

function handleCopyLink() {
  copyToClipboard(fullShareUrl.value);
}

function handleResetForm() {
  resetForm();
  showQrCode.value = true;
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
    <!-- Create Message Section -->
    <div class="relative z-10 -mt-16">
      <div
        class="backdrop-blur-lg bg-gray-900/80 rounded-2xl shadow-2xl overflow-hidden border border-gray-800 transition-all duration-500 theme-shadow"
      >
        <div class="p-8">
          <LandingMessageForm
            v-if="!shareLink"
            v-model:message="message"
            :loading="loading"
            :error="error"
            @generate-link="generateLink"
          />

          <LandingLinkResult
            v-else
            :share-link="shareLink"
            :copied="copied"
            :show-qr-code="showQrCode"
            @copy-link="handleCopyLink"
            @reset-form="handleResetForm"
            @toggle-qr="showQrCode = !showQrCode"
          />
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <LandingFeatures />

    <!-- Security Stats -->
    <LandingSecurityStats />

    <!-- CTA Section -->
    <LandingCTA />
  </div>
</template>
