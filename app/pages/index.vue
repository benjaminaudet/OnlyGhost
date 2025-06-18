<script setup lang="ts">
const { color, colorRgb, accentColor, accentColorRgb } = useThemeColors({
  useRandomColors: true,
});

useHead({
  title: 'onlyghost.com - Secure Data Sharing',
  meta: [
    {
      name: 'description',
      content:
        'onlyghost.com provides zero-knowledge secure data sharing with end-to-end encryption and automatic deletion. Leave Only Ghosts Behind.',
    },
  ],
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white"
    :style="{
      '--theme-color': color,
      '--theme-rgb': colorRgb,
      '--accent-color': accentColor,
      '--accent-rgb': accentColorRgb,
    }"
  >
    <!-- Hero Header -->
    <LandingHero />

    <!-- Main Content -->
    <LandingContainer />
  </div>
</template>

<style scoped>
:root {
  --theme-color: #60a5fa;
  --theme-rgb: 96, 165, 250;
  --accent-color: #10b981;
  --accent-rgb: 16, 185, 129;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.theme-shadow {
  box-shadow: 0 0 40px rgba(var(--theme-rgb), 0.15),
    0 0 20px rgba(var(--theme-rgb), 0.1);
}

.shadow-theme-glow {
  box-shadow: 0 0 20px rgba(var(--theme-rgb), 0.15);
}

.shadow-accent-glow {
  box-shadow: 0 0 20px rgba(var(--accent-rgb), 0.15);
}

.shadow-glow {
  box-shadow: 0 0 30px rgba(var(--theme-rgb), 0.3);
}

.theme-gradient {
  background: linear-gradient(
    145deg,
    rgba(var(--theme-rgb), 0.25),
    rgba(var(--theme-rgb), 0.05)
  );
}

.theme-glow {
  background: var(--theme-color);
  filter: blur(40px);
}

.theme-button {
  background-color: var(--theme-color);
  box-shadow: 0 4px 14px rgba(var(--theme-rgb), 0.33);
}

.theme-button:hover {
  background-color: rgba(var(--theme-rgb), 0.9);
}

.theme-focus-ring:focus {
  --tw-ring-color: rgba(var(--theme-rgb), 0.5);
}

:deep(.dark-mode-info) {
  @apply bg-gray-800/60 border-gray-700 text-gray-200;
}
</style>
