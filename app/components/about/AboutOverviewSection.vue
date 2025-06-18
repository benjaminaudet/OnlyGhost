<template>
  <section id="overview" class="scroll-mt-20">
    <div class="group">
      <div class="flex items-center gap-4 mb-12">
        <div
          class="w-12 h-12 rounded-xl bg-gradient-to-br from-theme-color/30 to-accent-color/30 flex items-center justify-center backdrop-blur-lg border border-gray-800"
        >
          <Icon name="heroicons:eye" class="w-6 h-6 text-white" />
        </div>
        <h2
          class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
        >
          Our Mission
        </h2>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <div
          class="backdrop-blur-lg bg-gray-900/50 rounded-xl shadow-xl border border-gray-800 p-6 transform transition-all duration-300 group-hover:translate-y-[-5px] group-hover:shadow-theme-glow"
        >
          <Icon
            name="heroicons:shield-check"
            class="w-10 h-10 text-theme-color mb-4"
          />
          <h3 class="text-xl font-semibold text-white mb-3">
            Privacy By Design
          </h3>
          <p class="text-gray-300">
            GhostData was built from the ground up with one core principle: your
            sensitive data should remain completely private. We've engineered
            our platform to ensure we literally cannot access your data.
          </p>
        </div>

        <div
          class="backdrop-blur-lg bg-gray-900/50 rounded-xl shadow-xl border border-gray-800 p-6 transform transition-all duration-300 group-hover:translate-y-[-5px] group-hover:shadow-accent-glow"
        >
          <Icon
            name="heroicons:light-bulb"
            class="w-10 h-10 text-accent-color mb-4"
          />
          <h3 class="text-xl font-semibold text-white mb-3">
            Simple Yet Secure
          </h3>
          <p class="text-gray-300">
            Security shouldn't be complicated. We've created an intuitive
            platform that makes sharing sensitive data as easy as sending a
            link, while maintaining military-grade security standards.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No props needed for this component
</script>
