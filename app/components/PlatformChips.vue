<template>
  <div v-if="chips.length" class="platform-chips">
    <p v-if="label" :id="labelId" class="platform-chips__label">{{ label }}</p>
    <ul class="platform-chips__list" :aria-labelledby="label ? labelId : undefined">
      <li v-for="chip in chips" :key="chip.platform">
        <a v-if="chip.href" :href="chip.href" v-bind="external(chip.href)" :aria-label="name ? `${name} for ${chip.label}` : undefined" class="platform-chip">
          <PlatformIcon :platform="chip.platform" class="platform-chip__icon" />
          {{ chip.label }}
        </a>
        <span v-else class="platform-chip platform-chip--soon">
          <PlatformIcon :platform="chip.platform" class="platform-chip__icon" />
          {{ chip.label }}
          <span class="platform-chip__soon">Soon</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'

import { platformChips, type Platforms } from '../utils/platforms'
import PlatformIcon from './PlatformIcon.vue'

const props = withDefaults(
  defineProps<{
    platforms: Platforms
    /** The product's name, for each link's accessible name ("Lumber for Windows"), since the chips alone say only "Windows" */
    name?: string
    /** Shown above the chips; pass '' to leave it off */
    label?: string
  }>(),
  { name: undefined, label: 'Available On' }
)

const chips = computed(() => platformChips(props.platforms))
const labelId = useId()

// Store listings and download pages open in a new tab, like every other outbound link on the sites
const external = (href: string) => (href.startsWith('https://') ? { target: '_blank', rel: 'noopener' } : {})
</script>

<style scoped>
/* Colors come from the text color the site sets on the component, so the chips fit a dark or light card as they are */
.platform-chips__label {
  margin: 0 0 0.5rem;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 500;
  opacity: 0.75;
}

.platform-chips__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.platform-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  border: 1px solid color-mix(in srgb, currentColor 25%, transparent);
  border-radius: 0.5rem;
  color: inherit;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition:
    border-color 150ms,
    background-color 150ms;
}

a.platform-chip:hover {
  border-color: color-mix(in srgb, currentColor 50%, transparent);
  background-color: color-mix(in srgb, currentColor 8%, transparent);
}

a.platform-chip:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

/* 0.8 keeps zinc-400 on a zinc-900 card above 4.5:1 contrast; 0.6 fell to about 3.3:1 */
.platform-chip--soon {
  border-style: dashed;
  opacity: 0.8;
}

.platform-chip__icon {
  width: 0.875rem;
  height: 0.875rem;
  flex-shrink: 0;
}

.platform-chip__soon {
  margin-left: 0.125rem;
  font-size: 0.625rem;
  line-height: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
