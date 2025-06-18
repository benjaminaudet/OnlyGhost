<script setup lang="ts">
// Features for scrolling animation
const features = [
  {
    title: 'End-to-End Encryption',
    description:
      "Your data never leaves your device unencrypted. We can't read it, even if we wanted to.",
    icon: 'heroicons:lock-closed',
  },
  {
    title: 'Automatic Deletion',
    description:
      'Messages are permanently deleted after being viewed or automatically expire in 24 hours.',
    icon: 'heroicons:clock',
  },
  {
    title: 'No Sign-Up Required',
    description:
      'No accounts, no tracking, no personal data collection. Just share your encrypted data instantly.',
    icon: 'heroicons:user-minus',
  },
];
</script>

<template>
  <div class="mt-24">
    <div class="flex items-center gap-4 mb-12">
      <div
        class="w-12 h-12 rounded-xl bg-gradient-to-br from-theme-color/30 to-accent-color/30 flex items-center justify-center backdrop-blur-lg border border-gray-800"
      >
        <Icon name="heroicons:lock-closed" class="w-6 h-6 text-white" />
      </div>
      <h2
        class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
      >
        How It Works
      </h2>
    </div>

    <div class="grid md:grid-cols-3 gap-8">
      <div
        v-for="(feature, index) in features"
        :key="index"
        class="backdrop-blur-lg bg-gray-900/50 rounded-xl shadow-xl border border-gray-800 p-6 hover:shadow-theme-glow transition-all duration-300 transform hover:-translate-y-1"
      >
        <div
          class="h-12 w-12 rounded-full bg-theme-color/20 flex items-center justify-center mb-6"
        >
          <Icon :name="feature.icon" class="w-6 h-6 text-theme-color" />
        </div>
        <h3 class="text-xl font-semibold text-white mb-3">
          {{ feature.title }}
        </h3>
        <p class="text-gray-300">{{ feature.description }}</p>
      </div>
    </div>
  </div>
</template>
