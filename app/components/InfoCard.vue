<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
  icon?: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}>();

const variantClasses = {
  primary: {
    bg: 'bg-indigo-900/30',
    border: 'border-indigo-700/50',
    title: 'text-indigo-300',
    description: 'text-indigo-400/80',
    icon: 'text-indigo-400',
  },
  success: {
    bg: 'bg-green-900/30',
    border: 'border-green-700/50',
    title: 'text-green-300',
    description: 'text-green-400/80',
    icon: 'text-green-400',
  },
  warning: {
    bg: 'bg-yellow-900/30',
    border: 'border-yellow-700/50',
    title: 'text-yellow-300',
    description: 'text-yellow-400/80',
    icon: 'text-yellow-400',
  },
  danger: {
    bg: 'bg-red-900/30',
    border: 'border-red-700/50',
    title: 'text-red-300',
    description: 'text-red-400/80',
    icon: 'text-red-400',
  },
  info: {
    bg: 'bg-blue-900/30',
    border: 'border-blue-700/50',
    title: 'text-blue-300',
    description: 'text-blue-400/80',
    icon: 'text-blue-400',
  },
};

const variantType = props.variant || 'primary';
const classes = variantClasses[variantType];
</script>

<template>
  <div
    :class="[
      classes.bg,
      classes.border,
      'border rounded-lg p-4 mb-4 backdrop-blur-sm transition-all duration-300 hover:bg-opacity-50',
    ]"
  >
    <div class="flex">
      <div v-if="icon" :class="[classes.icon, 'flex-shrink-0 mr-3']">
        <Icon name="ph:ghost" class="w-5 h-5" />
      </div>
      <div>
        <h3 :class="[classes.title, 'text-sm font-medium mb-1']">
          {{ title }}
        </h3>
        <p :class="[classes.description, 'text-xs']">{{ description }}</p>
      </div>
    </div>
  </div>
</template>
