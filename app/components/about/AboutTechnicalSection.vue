<template>
  <section id="technical" class="scroll-mt-20">
    <div class="flex items-center gap-4 mb-12">
      <div
        class="w-12 h-12 rounded-xl bg-gradient-to-br from-theme-color/30 to-accent-color/30 flex items-center justify-center backdrop-blur-lg border border-gray-800"
      >
        <Icon name="heroicons:code-bracket-square" class="w-6 h-6 text-white" />
      </div>
      <h2
        class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
      >
        Technical Details
      </h2>
    </div>

    <div
      class="backdrop-blur-lg bg-gray-900/50 rounded-xl shadow-xl border border-gray-800 p-8"
    >
      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-xl font-semibold text-theme-color mb-4">
            Our Security Approach
          </h3>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div
                class="w-8 h-8 rounded-full bg-theme-color/20 flex items-center justify-center flex-shrink-0"
              >
                <Icon
                  name="heroicons:shield-check"
                  class="w-4 h-4 text-theme-color"
                />
              </div>
              <div>
                <h4 class="font-medium text-white">End-to-End Encryption</h4>
                <p class="text-gray-400 text-sm">
                  All encryption and decryption operations occur in your browser
                </p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <div
                class="w-8 h-8 rounded-full bg-theme-color/20 flex items-center justify-center flex-shrink-0"
              >
                <Icon name="heroicons:key" class="w-4 h-4 text-theme-color" />
              </div>
              <div>
                <h4 class="font-medium text-white">Strong Encryption</h4>
                <p class="text-gray-400 text-sm">
                  Industry-standard AES-256 encryption with secure key
                  management
                </p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <div
                class="w-8 h-8 rounded-full bg-theme-color/20 flex items-center justify-center flex-shrink-0"
              >
                <Icon
                  name="heroicons:eye-slash"
                  class="w-4 h-4 text-theme-color"
                />
              </div>
              <div>
                <h4 class="font-medium text-white">Zero Server Knowledge</h4>
                <p class="text-gray-400 text-sm">
                  Our servers never receive or store decryption keys
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-xl font-semibold text-accent-color mb-4">
            Advanced Features
          </h3>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div
                class="w-8 h-8 rounded-full bg-accent-color/20 flex items-center justify-center flex-shrink-0"
              >
                <Icon
                  name="heroicons:arrow-path"
                  class="w-4 h-4 text-accent-color"
                />
              </div>
              <div>
                <h4 class="font-medium text-white">Secure Key Exchange</h4>
                <p class="text-gray-400 text-sm">
                  Decryption keys are never transmitted to our servers
                </p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <div
                class="w-8 h-8 rounded-full bg-accent-color/20 flex items-center justify-center flex-shrink-0"
              >
                <Icon
                  name="heroicons:trash"
                  class="w-4 h-4 text-accent-color"
                />
              </div>
              <div>
                <h4 class="font-medium text-white">Ephemeral Data</h4>
                <p class="text-gray-400 text-sm">
                  Messages are deleted immediately after viewing or within 24
                  hours
                </p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <div
                class="w-8 h-8 rounded-full bg-accent-color/20 flex items-center justify-center flex-shrink-0"
              >
                <Icon
                  name="heroicons:globe-alt"
                  class="w-4 h-4 text-accent-color"
                />
              </div>
              <div>
                <h4 class="font-medium text-white">Modern Web Standards</h4>
                <p class="text-gray-400 text-sm">
                  Leverages cryptographic primitives available in all major
                  browsers
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-10 p-6 rounded-lg bg-gray-800/50 border border-gray-700">
        <div class="flex items-start gap-3">
          <Icon
            name="heroicons:information-circle"
            class="w-6 h-6 text-theme-color flex-shrink-0"
          />
          <p class="text-gray-300">
            Our approach leverages modern web security standards and
            cryptographic primitives available in all major browsers to provide
            a balance of exceptional security and ease of use.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No props needed for this component
</script>
