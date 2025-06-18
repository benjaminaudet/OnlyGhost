<template>
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
      class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10"
    >
      <div
        class="flex flex-col md:flex-row items-center justify-between gap-12"
      >
        <div class="flex-1 text-center md:text-left">
          <div
            class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-lg mb-6 border border-gray-700/50"
          >
            <div class="h-2 w-2 rounded-full bg-teal-500 animate-pulse"></div>
            <span class="text-sm font-medium text-gray-300"
              >Zero Knowledge Security</span
            >
          </div>

          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span
              class="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
            >
              About GhostData
            </span>
          </h1>

          <p class="text-xl text-gray-300 max-w-xl mb-8">
            Learn how our zero knowledge architecture keeps your sensitive data
            completely private with military-grade encryption.
          </p>

          <div class="flex flex-wrap gap-4 justify-center md:justify-start">
            <button
              @click="scrollToSection('protection')"
              class="px-6 py-3 rounded-lg bg-theme-color hover:bg-theme-color/90 text-white font-medium transition-all flex items-center gap-2"
            >
              <Icon name="heroicons:shield-check" class="w-5 h-5" />
              Security Details
            </button>

            <button
              @click="scrollToSection('faq')"
              class="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium border border-gray-700 transition-all flex items-center gap-2"
            >
              <Icon name="heroicons:question-mark-circle" class="w-5 h-5" />
              Common Questions
            </button>
          </div>
        </div>

        <div class="flex-1 flex justify-center md:justify-end">
          <div class="relative w-72 h-72">
            <!-- Animated lock illustration -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="relative w-40 h-40">
                <div
                  class="absolute inset-0 rounded-full border-4 border-gray-700 opacity-30 animate-pulse-slow"
                ></div>
                <div
                  class="absolute inset-4 rounded-full border-4 border-gray-600 opacity-40 animate-pulse-slow animation-delay-300"
                ></div>
                <div
                  class="absolute inset-8 rounded-full border-4 border-gray-500 opacity-50 animate-pulse-slow animation-delay-600"
                ></div>
                <div
                  class="absolute inset-12 rounded-full border-4 border-theme-color opacity-60 animate-pulse-slow animation-delay-900"
                ></div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <Icon
                    name="heroicons:lock-closed"
                    class="w-16 h-16 text-theme-color"
                  />
                </div>
              </div>
            </div>
            <!-- Floating particles -->
            <div
              class="absolute top-10 left-10 w-3 h-3 rounded-full bg-theme-color/30 animate-float"
            ></div>
            <div
              class="absolute top-20 right-20 w-2 h-2 rounded-full bg-accent-color/30 animate-float animation-delay-300"
            ></div>
            <div
              class="absolute bottom-20 left-30 w-4 h-4 rounded-full bg-accent-color/20 animate-float animation-delay-600"
            ></div>
            <div
              class="absolute bottom-30 right-10 w-2 h-2 rounded-full bg-theme-color/20 animate-float animation-delay-900"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  scrollToSection: (sectionId: string) => void;
}

defineProps<Props>();
</script>
