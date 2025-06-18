<template>
  <section id="faq" class="scroll-mt-20">
    <div class="flex items-center gap-4 mb-12">
      <div
        class="w-12 h-12 rounded-xl bg-gradient-to-br from-theme-color/30 to-accent-color/30 flex items-center justify-center backdrop-blur-lg border border-gray-800"
      >
        <Icon
          name="heroicons:question-mark-circle"
          class="w-6 h-6 text-white"
        />
      </div>
      <h2
        class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
      >
        Frequently Asked Questions
      </h2>
    </div>

    <div class="space-y-4">
      <!-- FAQ Item 1 -->
      <div
        class="backdrop-blur-lg bg-gray-900/50 rounded-xl shadow-xl border border-gray-800 overflow-hidden transition-all duration-300"
      >
        <button
          @click="toggleFaq(0)"
          class="w-full px-6 py-4 flex items-center justify-between text-left transition-all"
          :class="{ 'border-b border-gray-800': openFaqIndex === 0 }"
        >
          <h3 class="text-xl font-semibold text-white">
            What if I send the link by email and my email gets hacked?
          </h3>
          <Icon
            :name="
              openFaqIndex === 0
                ? 'heroicons:chevron-up'
                : 'heroicons:chevron-down'
            "
            class="w-5 h-5 text-gray-400 transition-transform"
          />
        </button>
        <div v-show="openFaqIndex === 0" class="px-6 py-4 text-gray-300">
          <p class="mb-3">GhostData provides multiple layers of protection:</p>
          <ul class="space-y-2 pl-6">
            <li class="flex items-start gap-2">
              <Icon
                name="heroicons:clock"
                class="w-5 h-5 text-theme-color flex-shrink-0 mt-1"
              />
              <span
                >The data is deleted after 24 hours, limiting the window of
                vulnerability</span
              >
            </li>
            <li class="flex items-start gap-2">
              <Icon
                name="heroicons:trash"
                class="w-5 h-5 text-theme-color flex-shrink-0 mt-1"
              />
              <span
                >Once the message is opened, it's permanently deleted from our
                servers</span
              >
            </li>
            <li class="flex items-start gap-2">
              <Icon
                name="heroicons:key"
                class="w-5 h-5 text-theme-color flex-shrink-0 mt-1"
              />
              <span
                >Each message has a unique encryption key, so compromising one
                message doesn't affect others</span
              >
            </li>
            <li class="flex items-start gap-2">
              <Icon
                name="heroicons:light-bulb"
                class="w-5 h-5 text-theme-color flex-shrink-0 mt-1"
              />
              <span
                >For highly sensitive data, we recommend using another secure
                channel to share the link</span
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- FAQ Item 2 -->
      <div
        class="backdrop-blur-lg bg-gray-900/50 rounded-xl shadow-xl border border-gray-800 overflow-hidden transition-all duration-300"
      >
        <button
          @click="toggleFaq(1)"
          class="w-full px-6 py-4 flex items-center justify-between text-left transition-all"
          :class="{ 'border-b border-gray-800': openFaqIndex === 1 }"
        >
          <h3 class="text-xl font-semibold text-white">
            Can GhostData read my messages?
          </h3>
          <Icon
            :name="
              openFaqIndex === 1
                ? 'heroicons:chevron-up'
                : 'heroicons:chevron-down'
            "
            class="w-5 h-5 text-gray-400 transition-transform"
          />
        </button>
        <div v-show="openFaqIndex === 1" class="px-6 py-4 text-gray-300">
          <p>
            No. Due to our zero knowledge architecture, we cannot read your
            messages even if we wanted to. The encryption and decryption happen
            entirely in your browser, and the decryption keys are never sent to
            or stored on our servers.
          </p>
        </div>
      </div>

      <!-- FAQ Item 3 -->
      <div
        class="backdrop-blur-lg bg-gray-900/50 rounded-xl shadow-xl border border-gray-800 overflow-hidden transition-all duration-300"
      >
        <button
          @click="toggleFaq(2)"
          class="w-full px-6 py-4 flex items-center justify-between text-left transition-all"
          :class="{ 'border-b border-gray-800': openFaqIndex === 2 }"
        >
          <h3 class="text-xl font-semibold text-white">
            What happens after someone views my message?
          </h3>
          <Icon
            :name="
              openFaqIndex === 2
                ? 'heroicons:chevron-up'
                : 'heroicons:chevron-down'
            "
            class="w-5 h-5 text-gray-400 transition-transform"
          />
        </button>
        <div v-show="openFaqIndex === 2" class="px-6 py-4 text-gray-300">
          <p>
            Once a message is viewed, it's immediately and permanently deleted
            from our servers. There is no way to recover it after viewing. This
            ensures that sensitive data doesn't linger.
          </p>
        </div>
      </div>

      <!-- FAQ Item 4 -->
      <div
        class="backdrop-blur-lg bg-gray-900/50 rounded-xl shadow-xl border border-gray-800 overflow-hidden transition-all duration-300"
      >
        <button
          @click="toggleFaq(3)"
          class="w-full px-6 py-4 flex items-center justify-between text-left transition-all"
          :class="{ 'border-b border-gray-800': openFaqIndex === 3 }"
        >
          <h3 class="text-xl font-semibold text-white">
            What if my recipient doesn't open the message?
          </h3>
          <Icon
            :name="
              openFaqIndex === 3
                ? 'heroicons:chevron-up'
                : 'heroicons:chevron-down'
            "
            class="w-5 h-5 text-gray-400 transition-transform"
          />
        </button>
        <div v-show="openFaqIndex === 3" class="px-6 py-4 text-gray-300">
          <p>
            All messages automatically expire after 24 hours if they haven't
            been viewed. After this period, the encrypted data is permanently
            deleted from our servers, and there is no way to recover it.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  openFaqIndex: number;
  toggleFaq: (index: number) => void;
}

defineProps<Props>();
</script>
