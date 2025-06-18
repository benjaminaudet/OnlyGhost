<template>
  <div class="mt-24 text-center">
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
          Ready to share securely? Leave Only Ghosts Behind.
        </h2>
        <p class="text-gray-300 max-w-xl mx-auto mb-8">
          onlyghost.com provides the safest way to share sensitive information
          with military-grade encryption and automatic deletion.
        </p>

        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink
            to="/terms"
            class="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium border border-gray-700 transition-all flex items-center gap-2"
          >
            <Icon name="heroicons:document-text" class="w-5 h-5" />
            Terms of Service
          </NuxtLink>

          <NuxtLink
            to="/about"
            class="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium border border-gray-700 transition-all flex items-center gap-2"
          >
            <Icon name="heroicons:shield-check" class="w-5 h-5" />
            Security Model
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
