<template>
  <span class="app-icon" :class="{ 'app-icon--auto': colorMode === 'auto' }" :style="{ width: `${size}px`, height: `${size}px` }">
    <!-- Decorative: the app's or game's name is always beside it -->
    <img :src="icon.src" alt="" :width="size" :height="size" loading="lazy" decoding="async" class="app-icon__img" :class="{ 'app-icon__img--tile': icon.tile, 'app-icon__img--dark': light }" />
    <img v-if="light" :src="light" alt="" :width="size" :height="size" loading="lazy" decoding="async" class="app-icon__img app-icon__img--light" :class="{ 'app-icon__img--tile': icon.tile }" />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { AppIconImage } from '../utils/games'

const props = withDefaults(
  defineProps<{
    icon: AppIconImage
    /** Its width and height in CSS pixels */
    size: number
    /** `'dark'` for a dark-only site, which always draws `src`; `'auto'` for a site with light and dark modes, which
     *  draws `light` (when the icon has one) unless `<html>` has the `dark` class, as @nuxtjs/color-mode sets it */
    colorMode?: 'dark' | 'auto'
  }>(),
  { colorMode: 'dark' }
)

const light = computed(() => (props.colorMode === 'auto' ? props.icon.light : undefined))
</script>

<style>
.app-icon {
  display: block;
  flex-shrink: 0;
}

.app-icon__img {
  display: block;
  width: 100%;
  height: 100%;
}

/* iOS rounds an app icon's corners to about 22% of its width; the faint ring edges a tile on a card of its own color */
.app-icon__img--tile {
  border-radius: 22%;
  box-shadow: 0 0 0 1px rgb(255 255 255 / 10%);
}

.app-icon--auto .app-icon__img--tile {
  box-shadow: 0 0 0 1px rgb(0 0 0 / 5%);
}

:root.dark .app-icon--auto .app-icon__img--tile {
  box-shadow: 0 0 0 1px rgb(255 255 255 / 10%);
}

.app-icon__img--dark,
:root.dark .app-icon__img--light {
  display: none;
}

:root.dark .app-icon__img--dark {
  display: block;
}
</style>
