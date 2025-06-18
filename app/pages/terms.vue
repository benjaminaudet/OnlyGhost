<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

// Define a color palette with primary and accent colors
const color = useState('color', () => '#3b82f6'); // Medium blue
const colorRgb = useState('colorRgb', () => '59, 130, 246');
const accentColor = useState('accentColor', () => '#10b981'); // Emerald green
const accentColorRgb = useState('accentColorRgb', () => '16, 185, 129');

// Control the active section for smooth scrolling
const activeSection = ref('overview');
const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'terms', label: 'Terms' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'limitations', label: 'Limitations' },
];

// Accordion state
const openAccordionIndex = ref(-1);
const toggleAccordion = (index: number) => {
  openAccordionIndex.value = openAccordionIndex.value === index ? -1 : index;
};

// Intersection observer for section highlighting
onMounted(() => {
  if (process.client) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id;
          }
        });
      },
      { rootMargin: '-100px 0px -100px 0px', threshold: 0.3 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });
  }
});

// Smooth scroll function
const scrollToSection = (sectionId: string) => {
  activeSection.value = sectionId;
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

useHead({
  title: 'GhostData - Terms of Service',
  meta: [
    {
      name: 'description',
      content:
        "Read GhostData's Terms of Service, usage guidelines, and privacy practices for our zero-knowledge secure data sharing platform.",
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

    <!-- Hero Header -->
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
          <div class="flex-1 text-center md:text-left">
            <div
              class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-lg mb-6 border border-gray-700/50"
            >
              <div class="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
              <span class="text-sm font-medium text-gray-300"
                >Legal Information</span
              >
            </div>

            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span
                class="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
              >
                Terms of Service
              </span>
            </h1>

            <p class="text-xl text-gray-300 max-w-xl mb-8">
              Our commitment to privacy, security, and fair usage of the
              GhostData platform.
            </p>

            <div class="flex flex-wrap gap-4 justify-center md:justify-start">
              <button
                @click="scrollToSection('terms')"
                class="px-6 py-3 rounded-lg bg-theme-color hover:bg-theme-color/90 text-white font-medium transition-all flex items-center gap-2"
              >
                <Icon name="heroicons:document-text" class="w-5 h-5" />
                Read Terms
              </button>

              <button
                @click="scrollToSection('privacy')"
                class="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium border border-gray-700 transition-all flex items-center gap-2"
              >
                <Icon name="heroicons:shield-check" class="w-5 h-5" />
                Privacy Policy
              </button>
            </div>
          </div>

          <div class="flex-1 flex justify-center md:justify-end">
            <div class="relative w-72 h-72">
              <!-- Animated document illustration -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="relative w-40 h-40">
                  <div
                    class="absolute inset-0 rounded-lg border-4 border-gray-700 opacity-30 animate-pulse-slow"
                  ></div>
                  <div
                    class="absolute inset-4 rounded-lg border-4 border-gray-600 opacity-40 animate-pulse-slow animation-delay-300"
                  ></div>
                  <div
                    class="absolute inset-8 rounded-lg border-4 border-gray-500 opacity-50 animate-pulse-slow animation-delay-600"
                  ></div>
                  <div
                    class="absolute inset-12 rounded-lg border-4 border-theme-color opacity-60 animate-pulse-slow animation-delay-900"
                  ></div>
                  <div
                    class="absolute inset-0 flex items-center justify-center"
                  >
                    <Icon
                      name="heroicons:document-text"
                      class="w-16 h-16 text-theme-color"
                    />
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

    <!-- Main Content Sections -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-24">
      <!-- Overview Section -->
      <section id="overview" class="scroll-mt-20">
        <div class="group">
          <div class="flex items-center gap-4 mb-12">
            <div
              class="w-12 h-12 rounded-xl bg-gradient-to-br from-theme-color/30 to-accent-color/30 flex items-center justify-center backdrop-blur-lg border border-gray-800"
            >
              <Icon name="heroicons:document" class="w-6 h-6 text-white" />
            </div>
            <h2
              class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
            >
              Overview
            </h2>
          </div>

          <div
            class="backdrop-blur-lg bg-gray-900/50 rounded-xl shadow-xl border border-gray-800 p-8"
          >
            <p class="text-gray-300 mb-6">
              This Terms of Service document outlines the rules, guidelines, and
              agreements that govern your use of GhostData's secure data sharing
              platform. By using our service, you agree to these terms in their
              entirety.
            </p>

            <div
              class="flex items-start gap-4 p-6 bg-gray-800/40 border border-gray-700/50 rounded-lg"
            >
              <Icon
                name="heroicons:information-circle"
                class="w-6 h-6 text-theme-color flex-shrink-0 mt-1"
              />
              <div>
                <h3 class="text-lg font-medium text-white mb-2">
                  Last Updated
                </h3>
                <p class="text-gray-300">
                  These Terms of Service were last updated on June 15, 2023. We
                  reserve the right to modify these terms at any time, and it is
                  your responsibility to review them periodically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Terms Section -->
      <section id="terms" class="scroll-mt-20">
        <div class="flex items-center gap-4 mb-12">
          <div
            class="w-12 h-12 rounded-xl bg-gradient-to-br from-theme-color/30 to-accent-color/30 flex items-center justify-center backdrop-blur-lg border border-gray-800"
          >
            <Icon
              name="heroicons:clipboard-document-list"
              class="w-6 h-6 text-white"
            />
          </div>
          <h2
            class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
          >
            Terms of Use
          </h2>
        </div>

        <div class="space-y-6">
          <!-- Terms Item 1 -->
          <div
            class="backdrop-blur-lg bg-gray-900/50 rounded-xl shadow-xl border border-gray-800 overflow-hidden transition-all duration-300"
          >
            <button
              @click="toggleAccordion(0)"
              class="w-full px-6 py-4 flex items-center justify-between text-left transition-all"
              :class="{ 'border-b border-gray-800': openAccordionIndex === 0 }"
            >
              <h3 class="text-xl font-semibold text-white">
                Acceptance of Terms
              </h3>
              <Icon
                :name="
                  openAccordionIndex === 0
                    ? 'heroicons:chevron-up'
                    : 'heroicons:chevron-down'
                "
                class="w-5 h-5 text-gray-400 transition-transform"
              />
            </button>
            <div
              v-show="openAccordionIndex === 0"
              class="px-6 py-4 text-gray-300"
            >
              <p class="mb-4">
                By accessing or using GhostData's services, you acknowledge that
                you have read, understood, and agree to be bound by these Terms
                of Service. If you do not agree to these terms, you must not
                access or use our services.
              </p>
              <p>
                These terms constitute a legally binding agreement between you
                and GhostData regarding your use of the service. You represent
                that you have the legal capacity to enter into this agreement.
              </p>
            </div>
          </div>

          <!-- Terms Item 2 -->
          <div
            class="backdrop-blur-lg bg-gray-900/50 rounded-xl shadow-xl border border-gray-800 overflow-hidden transition-all duration-300"
          >
            <button
              @click="toggleAccordion(1)"
              class="w-full px-6 py-4 flex items-center justify-between text-left transition-all"
              :class="{ 'border-b border-gray-800': openAccordionIndex === 1 }"
            >
              <h3 class="text-xl font-semibold text-white">
                Description of Service
              </h3>
              <Icon
                :name="
                  openAccordionIndex === 1
                    ? 'heroicons:chevron-up'
                    : 'heroicons:chevron-down'
                "
                class="w-5 h-5 text-gray-400 transition-transform"
              />
            </button>
            <div
              v-show="openAccordionIndex === 1"
              class="px-6 py-4 text-gray-300"
            >
              <p class="mb-4">
                GhostData provides a zero-knowledge, end-to-end encrypted
                platform for sharing sensitive information. The service allows
                users to send encrypted messages that are automatically deleted
                after being viewed or within 24 hours if unread.
              </p>
              <p class="mb-4">
                We use client-side encryption, meaning all encryption and
                decryption happen in your browser. Your data never leaves your
                device in an unencrypted form, and we do not have access to your
                encryption keys.
              </p>
              <p>
                We reserve the right to modify, suspend, or discontinue the
                service (or any part thereof) at any time with or without
                notice.
              </p>
            </div>
          </div>

          <!-- Terms Item 3 -->
          <div
            class="backdrop-blur-lg bg-gray-900/50 rounded-xl shadow-xl border border-gray-800 overflow-hidden transition-all duration-300"
          >
            <button
              @click="toggleAccordion(2)"
              class="w-full px-6 py-4 flex items-center justify-between text-left transition-all"
              :class="{ 'border-b border-gray-800': openAccordionIndex === 2 }"
            >
              <h3 class="text-xl font-semibold text-white">Prohibited Uses</h3>
              <Icon
                :name="
                  openAccordionIndex === 2
                    ? 'heroicons:chevron-up'
                    : 'heroicons:chevron-down'
                "
                class="w-5 h-5 text-gray-400 transition-transform"
              />
            </button>
            <div
              v-show="openAccordionIndex === 2"
              class="px-6 py-4 text-gray-300"
            >
              <p class="mb-4">
                You agree not to use GhostData's services for any illegal,
                harmful, or prohibited activities, including but not limited to:
              </p>
              <ul class="space-y-2 pl-6 mb-4">
                <li class="flex items-start gap-2">
                  <Icon
                    name="heroicons:x-circle"
                    class="w-5 h-5 text-red-500 flex-shrink-0 mt-1"
                  />
                  <span
                    >Distributing malware, viruses, or other malicious
                    code</span
                  >
                </li>
                <li class="flex items-start gap-2">
                  <Icon
                    name="heroicons:x-circle"
                    class="w-5 h-5 text-red-500 flex-shrink-0 mt-1"
                  />
                  <span
                    >Sharing content that violates intellectual property
                    rights</span
                  >
                </li>
                <li class="flex items-start gap-2">
                  <Icon
                    name="heroicons:x-circle"
                    class="w-5 h-5 text-red-500 flex-shrink-0 mt-1"
                  />
                  <span
                    >Engaging in illegal activities or promoting such
                    activities</span
                  >
                </li>
                <li class="flex items-start gap-2">
                  <Icon
                    name="heroicons:x-circle"
                    class="w-5 h-5 text-red-500 flex-shrink-0 mt-1"
                  />
                  <span
                    >Attempting to gain unauthorized access to our systems or
                    interfere with the service</span
                  >
                </li>
              </ul>
              <p>
                We reserve the right to terminate your access to the service if
                we have reason to believe you have violated these terms.
              </p>
            </div>
          </div>

          <!-- Terms Item 4 -->
          <div
            class="backdrop-blur-lg bg-gray-900/50 rounded-xl shadow-xl border border-gray-800 overflow-hidden transition-all duration-300"
          >
            <button
              @click="toggleAccordion(3)"
              class="w-full px-6 py-4 flex items-center justify-between text-left transition-all"
              :class="{ 'border-b border-gray-800': openAccordionIndex === 3 }"
            >
              <h3 class="text-xl font-semibold text-white">
                Intellectual Property
              </h3>
              <Icon
                :name="
                  openAccordionIndex === 3
                    ? 'heroicons:chevron-up'
                    : 'heroicons:chevron-down'
                "
                class="w-5 h-5 text-gray-400 transition-transform"
              />
            </button>
            <div
              v-show="openAccordionIndex === 3"
              class="px-6 py-4 text-gray-300"
            >
              <p class="mb-4">
                All content, features, and functionality of the GhostData
                service, including but not limited to text, graphics, logos,
                icons, and software, are the exclusive property of GhostData and
                are protected by copyright, trademark, and other intellectual
                property laws.
              </p>
              <p>
                You may not modify, reproduce, distribute, create derivative
                works from, publicly display, or in any way exploit any of the
                content of the service without our express prior written
                consent.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Privacy Section -->
      <section id="privacy" class="scroll-mt-20">
        <div class="flex items-center gap-4 mb-12">
          <div
            class="w-12 h-12 rounded-xl bg-gradient-to-br from-theme-color/30 to-accent-color/30 flex items-center justify-center backdrop-blur-lg border border-gray-800"
          >
            <Icon name="heroicons:shield-check" class="w-6 h-6 text-white" />
          </div>
          <h2
            class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
          >
            Privacy Policy
          </h2>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div
            class="backdrop-blur-lg bg-gray-900/50 rounded-xl shadow-xl border border-gray-800 p-6 hover:shadow-theme-glow transition-all duration-300"
          >
            <div
              class="h-12 w-12 rounded-full bg-theme-color/20 flex items-center justify-center mb-6"
            >
              <Icon
                name="heroicons:lock-closed"
                class="w-6 h-6 text-theme-color"
              />
            </div>
            <h3 class="text-xl font-semibold text-white mb-4">
              Data Collection
            </h3>
            <p class="text-gray-300 mb-4">
              We collect minimal information to provide our service:
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-2">
                <Icon
                  name="heroicons:check-circle"
                  class="w-5 h-5 text-accent-color flex-shrink-0 mt-1"
                />
                <span class="text-gray-300"
                  >Encrypted message content (which we cannot read)</span
                >
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="heroicons:check-circle"
                  class="w-5 h-5 text-accent-color flex-shrink-0 mt-1"
                />
                <span class="text-gray-300"
                  >Message creation and expiration timestamps</span
                >
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="heroicons:check-circle"
                  class="w-5 h-5 text-accent-color flex-shrink-0 mt-1"
                />
                <span class="text-gray-300"
                  >Standard server logs (IP addresses, browser
                  information)</span
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
              <Icon
                name="heroicons:no-symbol"
                class="w-6 h-6 text-theme-color"
              />
            </div>
            <h3 class="text-xl font-semibold text-white mb-4">Data Sharing</h3>
            <p class="text-gray-300 mb-4">
              We do not sell, trade, or otherwise transfer your information to
              third parties. We may share data in the following limited
              circumstances:
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-2">
                <Icon
                  name="heroicons:check-circle"
                  class="w-5 h-5 text-accent-color flex-shrink-0 mt-1"
                />
                <span class="text-gray-300"
                  >When required by law or valid legal process</span
                >
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="heroicons:check-circle"
                  class="w-5 h-5 text-accent-color flex-shrink-0 mt-1"
                />
                <span class="text-gray-300"
                  >To protect our rights, property, or safety</span
                >
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="heroicons:check-circle"
                  class="w-5 h-5 text-accent-color flex-shrink-0 mt-1"
                />
                <span class="text-gray-300"
                  >With service providers who help us operate our business</span
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
              <Icon name="heroicons:trash" class="w-6 h-6 text-theme-color" />
            </div>
            <h3 class="text-xl font-semibold text-white mb-4">
              Data Retention
            </h3>
            <p class="text-gray-300 mb-4">
              Our data retention policy is designed to minimize the storage of
              your data:
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-2">
                <Icon
                  name="heroicons:check-circle"
                  class="w-5 h-5 text-accent-color flex-shrink-0 mt-1"
                />
                <span class="text-gray-300"
                  >Messages are permanently deleted after being viewed</span
                >
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="heroicons:check-circle"
                  class="w-5 h-5 text-accent-color flex-shrink-0 mt-1"
                />
                <span class="text-gray-300"
                  >Unread messages are deleted after 24 hours</span
                >
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="heroicons:check-circle"
                  class="w-5 h-5 text-accent-color flex-shrink-0 mt-1"
                />
                <span class="text-gray-300"
                  >Server logs are retained for up to 7 days</span
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
              <Icon
                name="heroicons:globe-alt"
                class="w-6 h-6 text-theme-color"
              />
            </div>
            <h3 class="text-xl font-semibold text-white mb-4">
              Cookies & Tracking
            </h3>
            <p class="text-gray-300 mb-4">
              We use minimal cookies and analytics:
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-2">
                <Icon
                  name="heroicons:check-circle"
                  class="w-5 h-5 text-accent-color flex-shrink-0 mt-1"
                />
                <span class="text-gray-300"
                  >Necessary cookies for website functionality</span
                >
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="heroicons:check-circle"
                  class="w-5 h-5 text-accent-color flex-shrink-0 mt-1"
                />
                <span class="text-gray-300"
                  >Anonymous analytics to improve our service</span
                >
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="heroicons:check-circle"
                  class="w-5 h-5 text-accent-color flex-shrink-0 mt-1"
                />
                <span class="text-gray-300"
                  >No third-party tracking or advertising cookies</span
                >
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Limitations Section -->
      <section id="limitations" class="scroll-mt-20">
        <div class="flex items-center gap-4 mb-12">
          <div
            class="w-12 h-12 rounded-xl bg-gradient-to-br from-theme-color/30 to-accent-color/30 flex items-center justify-center backdrop-blur-lg border border-gray-800"
          >
            <Icon
              name="heroicons:exclamation-triangle"
              class="w-6 h-6 text-white"
            />
          </div>
          <h2
            class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
          >
            Limitations & Liability
          </h2>
        </div>

        <div
          class="backdrop-blur-lg bg-gray-900/50 rounded-xl shadow-xl border border-gray-800 p-8"
        >
          <div class="space-y-8">
            <div>
              <h3 class="text-xl font-semibold text-white mb-4">Disclaimers</h3>
              <div class="p-4 border border-gray-700 rounded-lg bg-gray-800/30">
                <p class="text-gray-300">
                  THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
                  WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE
                  FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES,
                  INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                  PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
              </div>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-white mb-4">
                Limitation of Liability
              </h3>
              <div class="p-4 border border-gray-700 rounded-lg bg-gray-800/30">
                <p class="text-gray-300">
                  IN NO EVENT SHALL GHOSTDATA BE LIABLE FOR ANY INDIRECT,
                  INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
                  INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE,
                  GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR
                  ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE.
                </p>
              </div>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-white mb-4">
                Indemnification
              </h3>
              <div class="p-4 border border-gray-700 rounded-lg bg-gray-800/30">
                <p class="text-gray-300">
                  You agree to defend, indemnify, and hold harmless GhostData,
                  its officers, directors, employees, and agents, from and
                  against any claims, liabilities, damages, losses, and
                  expenses, including without limitation reasonable attorney's
                  fees and costs, arising out of or in any way connected with
                  your access to or use of the service, your violation of these
                  Terms, or your violation of any third-party rights.
                </p>
              </div>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-white mb-4">
                Governing Law
              </h3>
              <div class="p-4 border border-gray-700 rounded-lg bg-gray-800/30">
                <p class="text-gray-300">
                  These Terms shall be governed by and construed in accordance
                  with the laws of [Jurisdiction], without regard to its
                  conflict of law provisions. Any legal action or proceeding
                  arising out of or relating to these Terms shall be brought
                  exclusively in the courts of [Jurisdiction].
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="text-center pb-12">
        <div
          class="backdrop-blur-xl bg-gray-900/50 rounded-xl shadow-xl border border-gray-800 p-8 relative overflow-hidden"
        >
          <!-- Background Effects -->
          <div
            class="absolute top-0 right-0 w-64 h-64 bg-theme-color/10 rounded-full filter blur-3xl transform translate-x-1/3 -translate-y-1/3"
          ></div>
          <div
            class="absolute bottom-0 left-0 w-64 h-64 bg-accent-color/10 rounded-full filter blur-3xl transform -translate-x-1/3 translate-y-1/3"
          ></div>

          <div class="relative z-10">
            <h2 class="text-3xl font-bold text-white mb-4">
              Questions About Our Terms?
            </h2>
            <p class="text-gray-300 max-w-xl mx-auto mb-8">
              If you have any questions or concerns about our Terms of Service
              or Privacy Policy, please contact us.
            </p>

            <button
              class="px-8 py-4 rounded-lg bg-gradient-to-r from-theme-color to-accent-color text-white font-medium shadow-lg hover:shadow-glow transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <Icon name="heroicons:envelope" class="w-5 h-5" />
              Contact Support
            </button>
          </div>
        </div>
      </section>
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
