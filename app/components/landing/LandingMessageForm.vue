<script setup lang="ts">
interface Props {
  message: string;
  loading: boolean;
  error: string;
}

interface Emits {
  (e: 'update:message', value: string): void;
  (e: 'generate-link'): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
  <div class="transition-opacity duration-300">
    <div class="flex items-center gap-4 mb-8">
      <div
        class="w-12 h-12 rounded-xl bg-gradient-to-br from-theme-color/30 to-accent-color/30 flex items-center justify-center backdrop-blur-lg border border-gray-800"
      >
        <Icon name="heroicons:paper-airplane" class="w-6 h-6 text-white" />
      </div>
      <h2
        class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
      >
        Send Secure Data
      </h2>
    </div>

    <div class="mb-6">
      <label for="message" class="block text-sm font-medium text-gray-300 mb-2"
        >Enter sensitive data</label
      >
      <textarea
        id="message"
        :value="message"
        @input="
          $emit('update:message', ($event.target as HTMLTextAreaElement).value)
        "
        rows="5"
        class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-opacity-50 text-gray-200 resize-none transition-all duration-300 theme-focus-ring"
        placeholder="Passwords, API keys, credentials, etc. — encrypted locally before transmission"
      ></textarea>
      <p v-if="error" class="mt-2 text-sm text-red-400 animate-pulse">
        {{ error }}
      </p>
    </div>

    <p class="text-xs text-gray-400 mb-4">
      By generating a link you accept our
      <NuxtLink to="/terms" class="text-theme-color hover:underline"
        >terms of services</NuxtLink
      >
    </p>

    <div class="flex flex-col sm:flex-row gap-4">
      <button
        @click="$emit('generate-link')"
        :disabled="loading"
        class="py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 flex justify-center items-center overflow-hidden relative group transition-all duration-300 theme-button flex-grow"
        :class="{ 'opacity-75 bg-gray-700': loading }"
      >
        <div
          class="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        ></div>
        <span
          v-if="loading"
          class="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"
        ></span>
        <Icon v-else name="heroicons:lock-closed" class="w-5 h-5 mr-2" />
        <span class="text-white font-medium">{{
          loading ? 'Generating...' : 'Generate Secure Link'
        }}</span>
      </button>

      <NuxtLink
        to="/about"
        class="py-3 px-6 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium border border-gray-700 transition-all flex items-center justify-center gap-2 flex-grow-0"
      >
        <Icon name="heroicons:information-circle" class="w-5 h-5" />
        <span>How It Works</span>
      </NuxtLink>
    </div>
  </div>
</template>
