<template>
  <div class="flex flex-col min-h-screen">
    <main class="flex-grow">
      <slot />
    </main>

    <footer class="bg-gray-800 text-gray-400 py-8">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between">
          <div class="mb-6 md:mb-0">
            <h2 class="text-white text-lg font-semibold mb-2 flex items-center">
              <Icon name="ph:ghost" class="text-white mr-2 w-5 h-5" />
              GhostData
            </h2>
            <p class="text-sm max-w-md">
              True zero knowledge data transmission where encryption happens in
              your browser. We never see your unencrypted data, and messages
              self-destruct after being viewed once.
            </p>
            <div class="mt-4 flex space-x-4">
              <NuxtLink
                to="/"
                class="text-gray-400 hover:text-white transition-colors duration-200"
                >Home</NuxtLink
              >
              <NuxtLink
                to="/about"
                class="text-gray-400 hover:text-white transition-colors duration-200"
                >About</NuxtLink
              >
              <NuxtLink
                to="/terms"
                class="text-gray-400 hover:text-white transition-colors duration-200"
                >Terms</NuxtLink
              >
            </div>
          </div>

          <div class="grid grid-cols-2 gap-8">
            <div>
              <h3 class="text-white text-sm font-semibold mb-3">Features</h3>
              <ul class="space-y-2 text-sm">
                <li class="flex items-center">
                  <Icon name="ph:lock" class="w-4 h-4 mr-1" />
                  Client-Side Encryption
                </li>
                <li class="flex items-center">
                  <Icon name="ph:clock" class="w-4 h-4 mr-1" />
                  24h Self-Destruct
                </li>
                <li class="flex items-center">
                  <Icon name="ph:eye-slash" class="w-4 h-4 mr-1" />
                  True Zero Knowledge
                </li>
              </ul>
            </div>

            <div>
              <h3 class="text-white text-sm font-semibold mb-3">Security</h3>
              <ul class="space-y-2 text-sm">
                <li class="flex items-center">
                  <Icon name="ph:shield-check" class="w-4 h-4 mr-1" />
                  Military-Grade AES-256
                </li>
                <li class="flex items-center">
                  <Icon name="ph:link" class="w-4 h-4 mr-1" />
                  URL Fragment Keys
                </li>
                <li class="flex items-center">
                  <Icon name="ph:user" class="w-4 h-4 mr-1" />
                  No Data Retention
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-700 mt-8 pt-6 text-sm text-center">
          <p>
            &copy; {{ new Date().getFullYear() }} GhostData. All rights
            reserved. An app made by
            <a
              href="https://florianargaud.com"
              class="text-theme-color hover:text-white transition-colors duration-200"
              >FlorianArgaud.com</a
            >
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
