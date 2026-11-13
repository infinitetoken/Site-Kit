<template>
  <!-- Device shapes, not brand logos: Apple's trademark rules keep its logo off third-party pages outside its official badges -->
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <template v-if="platform === 'web'">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </template>
    <template v-else-if="platform === 'ios' || platform === 'android'">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </template>
    <template v-else-if="platform === 'mac'">
      <path d="M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z" />
      <path d="M20.054 15.987H3.946" />
    </template>
    <template v-else>
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </template>
  </svg>
</template>

<script setup lang="ts">
// Lucide's globe, smartphone, laptop and monitor icons (https://lucide.dev, ISC License, see LICENSE)
import type { Platform } from '../utils/platforms'

defineProps<{ platform: Platform }>()
</script>
