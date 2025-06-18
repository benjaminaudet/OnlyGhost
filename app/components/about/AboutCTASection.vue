<template>
  <section class="text-center pb-12">
    <div
      class="backdrop-blur-xl bg-gray-900/50 rounded-xl shadow-xl border border-gray-800 p-8 relative overflow-hidden"
    >
      <!-- Background Effects -->
      <div
        class="absolute top-0 right-0 w-64 h-64 bg-theme-color/10 rounded-full filter blur-3xl transform translate-x-1/3 -translate-y-1/3"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-64 h-64 bg-accent-color/10 rounded-full filter blur-3xl transform -translate-x-1/3 translate-y-1/3"
      ></div>

      <div class="relative z-10">
        <h2 class="text-3xl font-bold text-white mb-4">
          Ready to try GhostData?
        </h2>
        <p class="text-gray-300 max-w-xl mx-auto mb-8">
          Share sensitive information securely with our zero-knowledge platform.
          No sign-up required.
        </p>

        <NuxtLink
          to="/"
          class="px-8 py-4 rounded-lg bg-gradient-to-r from-theme-color to-accent-color text-white font-medium shadow-lg hover:shadow-glow transition-all duration-300 flex items-center gap-2 mx-auto"
        >
          <Icon name="heroicons:paper-airplane" class="w-5 h-5" />
          Send a Secure Message
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No props needed for this component
</script>
