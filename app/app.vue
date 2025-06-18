<script setup lang="ts">
useHead({
  title: 'GhostData - True Zero Knowledge Secure Data Sharing',
  meta: [
    {
      name: 'description',
      content:
        'Share sensitive data with military-grade AES-256 encryption, true zero knowledge architecture, and 24-hour self-destruct. Your data never leaves your device unencrypted.',
    },
    {
      name: 'keywords',
      content:
        'secure sharing, zero knowledge, encryption, ephemeral data, self-destruct, privacy',
    },
    {
      property: 'og:title',
      content: 'GhostData - True Zero Knowledge Secure Data Sharing',
    },
    {
      property: 'og:description',
      content:
        "End-to-end encrypted data sharing where even we can't read your messages. Your secrets stay secret.",
    },
    {
      name: 'twitter:title',
      content: 'GhostData - Secure Zero Knowledge Sharing',
    },
    {
      name: 'twitter:description',
      content:
        'Share passwords, API keys and sensitive data with military-grade encryption and 24h self-destruct.',
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
