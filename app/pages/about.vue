<script setup lang="ts">
import { NuxtLink } from '#components';
import {
  AboutFloatingNavigation,
  AboutHeroHeader,
  AboutOverviewSection,
  AboutProtectionSection,
  AboutFAQSection,
  AboutTechnicalSection,
  AboutCTASection,
} from '~/components/about';
import { useSectionNavigation, useFAQ } from '~/composables/about';

const runtimeConfig = useRuntimeConfig();

// Use extracted composables
const { color, colorRgb, accentColor, accentColorRgb } = useThemeColors();
const { activeSection, sections, scrollToSection } = useSectionNavigation();
const { openFaqIndex, toggleFaq } = useFAQ();

useHead({
  title: 'About GhostData - Our Security Model',
  meta: [
    {
      name: 'description',
      content:
        "Learn about GhostData's true zero knowledge security architecture, AES-256 encryption, and how we protect your sensitive data.",
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
    <!-- Floating Navigation -->
    <AboutFloatingNavigation
      :active-section="activeSection"
      :sections="sections"
      :scroll-to-section="scrollToSection"
    />

    <!-- Hero Header -->
    <AboutHeroHeader :scroll-to-section="scrollToSection" />

    <!-- Main Content Sections -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-24">
      <!-- Overview Section -->
      <AboutOverviewSection />

      <!-- Protection Section -->
      <AboutProtectionSection />

      <!-- FAQ Section -->
      <AboutFAQSection :open-faq-index="openFaqIndex" :toggle-faq="toggleFaq" />

      <!-- Technical Section -->
      <AboutTechnicalSection />

      <!-- CTA Section -->
      <AboutCTASection />
    </div>
  </div>
</template>

<style scoped>
:root {
  --theme-color: #3b82f6;
  --theme-rgb: 59, 130, 246;
  --accent-color: #10b981;
  --accent-rgb: 16, 185, 129;
}

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

.text-theme-color {
  color: var(--theme-color);
}

.text-accent-color {
  color: var(--accent-color);
}

/* Improve readability */
.prose strong {
  color: rgba(var(--theme-rgb), 0.9);
  font-weight: 600;
}

.prose p,
.prose li {
  line-height: 1.7;
}

/* Scroll behavior */
html {
  scroll-behavior: smooth;
}
</style>
