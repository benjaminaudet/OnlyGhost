<template>
  <section id="protection" class="scroll-mt-20">
    <div class="flex items-center gap-4 mb-12">
      <div
        class="w-12 h-12 rounded-xl bg-gradient-to-br from-theme-color/30 to-accent-color/30 flex items-center justify-center backdrop-blur-lg border border-gray-800"
      >
        <Icon name="heroicons:lock-closed" class="w-6 h-6 text-white" />
      </div>
      <h2
        class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
      >
        How We Protect Your Data
      </h2>
    </div>

    <div class="grid md:grid-cols-3 gap-8">
      <div
        class="backdrop-blur-lg bg-gray-900/50 rounded-xl shadow-xl border border-gray-800 p-6 hover:shadow-theme-glow transition-all duration-300"
      >
        <div
          class="h-12 w-12 rounded-full bg-theme-color/20 flex items-center justify-center mb-6"
        >
          <Icon
            name="heroicons:computer-desktop"
            class="w-6 h-6 text-theme-color"
          />
        </div>
        <h3 class="text-xl font-semibold text-white mb-4">
          Zero Knowledge Architecture
        </h3>
        <ul class="space-y-3">
          <li class="flex items-start gap-2">
            <Icon
              name="heroicons:check-circle"
              class="w-5 h-5 text-accent-color flex-shrink-0 mt-1"
            />
            <span class="text-gray-300"
              >Client-side encryption keeps data private</span
            >
          </li>
          <li class="flex items-start gap-2">
            <Icon
              name="heroicons:check-circle"
              class="w-5 h-5 text-accent-color flex-shrink-0 mt-1"
            />
            <span class="text-gray-300"
              >We can't read your data even if compelled</span
            >
          </li>
          <li class="flex items-start gap-2">
            <Icon
              name="heroicons:check-circle"
              class="w-5 h-5 text-accent-color flex-shrink-0 mt-1"
            />
            <span class="text-gray-300"
              >Keys stored in URL fragments never reach our servers</span
            >
          </li>
        </ul>
      </div>

      <div
        class="backdrop-blur-lg bg-gray-900/50 rounded-xl shadow-xl border border-gray-800 p-6 hover:shadow-theme-glow transition-all duration-300"
      >
        <div
          class="h-12 w-12 rounded-full bg-theme-color/20 flex items-center justify-center mb-6"
        >
          <Icon name="heroicons:key" class="w-6 h-6 text-theme-color" />
        </div>
        <h3 class="text-xl font-semibold text-white mb-4">
          Military-Grade Encryption
        </h3>
        <ul class="space-y-3">
          <li class="flex items-start gap-2">
            <Icon
              name="heroicons:check-circle"
              class="w-5 h-5 text-accent-color flex-shrink-0 mt-1"
            />
            <span class="text-gray-300">AES-256 encryption with GCM mode</span>
          </li>
          <li class="flex items-start gap-2">
            <Icon
              name="heroicons:check-circle"
              class="w-5 h-5 text-accent-color flex-shrink-0 mt-1"
            />
            <span class="text-gray-300"
              >PBKDF2 key derivation with 100,000 iterations</span
            >
          </li>
          <li class="flex items-start gap-2">
            <Icon
              name="heroicons:check-circle"
              class="w-5 h-5 text-accent-color flex-shrink-0 mt-1"
            />
            <span class="text-gray-300">Unique keys for each message</span>
          </li>
        </ul>
      </div>

      <div
        class="backdrop-blur-lg bg-gray-900/50 rounded-xl shadow-xl border border-gray-800 p-6 hover:shadow-theme-glow transition-all duration-300"
      >
        <div
          class="h-12 w-12 rounded-full bg-theme-color/20 flex items-center justify-center mb-6"
        >
          <Icon name="heroicons:clock" class="w-6 h-6 text-theme-color" />
        </div>
        <h3 class="text-xl font-semibold text-white mb-4">Ephemeral Data</h3>
        <ul class="space-y-3">
          <li class="flex items-start gap-2">
            <Icon
              name="heroicons:check-circle"
              class="w-5 h-5 text-accent-color flex-shrink-0 mt-1"
            />
            <span class="text-gray-300"
              >Messages deleted after one-time viewing</span
            >
          </li>
          <li class="flex items-start gap-2">
            <Icon
              name="heroicons:check-circle"
              class="w-5 h-5 text-accent-color flex-shrink-0 mt-1"
            />
            <span class="text-gray-300"
              >All unread messages expire in 24 hours</span
            >
          </li>
          <li class="flex items-start gap-2">
            <Icon
              name="heroicons:check-circle"
              class="w-5 h-5 text-accent-color flex-shrink-0 mt-1"
            />
            <span class="text-gray-300"
              >No logs of message creation or access</span
            >
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No props needed for this component
</script>
