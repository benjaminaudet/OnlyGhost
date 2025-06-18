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
        <div class="text-center md:text-left w-full">
          <div
            class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-lg mb-6 border border-gray-700/50"
          >
            <div class="h-2 w-2 rounded-full bg-teal-500 animate-pulse"></div>
            <span class="text-sm font-medium text-gray-300"
              >Zero Knowledge Security</span
            >
          </div>

          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 w-full">
            <span
              class="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 flex items-center"
            >
              Leave Only Ghosts Behind
            </span>
          </h1>

          <p class="text-xl text-gray-300 max-w-xl mb-8">
            Share sensitive information with military-grade encryption. Your
            data is automatically deleted after being viewed.
          </p>
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

                <div class="absolute inset-0 flex items-center justify-center">
                  <Icon name="ph:ghost" class="w-16 h-16 text-theme-color" />
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

<style scoped>
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
</style>
