<template>
  <div
    class="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 hidden md:block"
  >
    <div
      class="backdrop-blur-xl bg-gray-900/80 rounded-full border border-gray-800 shadow-xl px-2 py-1"
    >
      <ul class="flex space-x-1">
        <li v-for="section in sections" :key="section.id">
          <button
            @click="scrollToSection(section.id)"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
              activeSection === section.id
                ? 'bg-gradient-to-r from-theme-color/90 to-theme-color/70 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50',
            ]"
          >
            {{ section.label }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  activeSection: string;
  sections: Array<{ id: string; label: string }>;
  scrollToSection: (sectionId: string) => void;
}

defineProps<Props>();
</script>
