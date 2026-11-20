import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import AppIcon from '../app/components/AppIcon.vue'
import { APP_ICONS, APP_SLUGS } from '../app/utils/apps'
import { GAME_ICONS, GAME_SLUGS } from '../app/utils/games'

describe('AppIcon', () => {
  it('draws the icon at its size, hidden from screen readers since the name is beside it', () => {
    const wrapper = mount(AppIcon, { props: { icon: GAME_ICONS.hangman, size: 56 } })
    expect(wrapper.attributes('style')).toContain('width: 56px')
    const img = wrapper.get('img')
    expect(img.attributes()).toMatchObject({ src: GAME_ICONS.hangman.src, alt: '', width: '56', height: '56' })
    expect(img.classes()).not.toContain('app-icon__img--tile')
  })

  it('rounds a tile like a home screen icon', () => {
    const wrapper = mount(AppIcon, { props: { icon: GAME_ICONS.cardtastic, size: 48 } })
    expect(wrapper.get('img').classes()).toContain('app-icon__img--tile')
  })

  it("draws only the dark icon on a dark-only site, even when there's a light one", () => {
    const wrapper = mount(AppIcon, { props: { icon: GAME_ICONS.swirlio, size: 56 } })
    expect(wrapper.findAll('img').map((img) => img.attributes('src'))).toEqual([GAME_ICONS.swirlio.src])
  })

  it('draws both when it follows the color mode, the CSS showing the one for the mode', () => {
    const wrapper = mount(AppIcon, { props: { icon: GAME_ICONS.swirlio, size: 48, colorMode: 'auto' } })
    expect(wrapper.classes()).toContain('app-icon--auto')
    const [dark, light] = wrapper.findAll('img')
    expect([dark?.attributes('src'), light?.attributes('src')]).toEqual([GAME_ICONS.swirlio.src, GAME_ICONS.swirlio.light])
    expect(dark?.classes()).toContain('app-icon__img--dark')
    expect(light?.classes()).toContain('app-icon__img--light')
  })
})

describe('GAME_ICONS', () => {
  it('has an icon for every game, each file in the layer', () => {
    expect(Object.keys(GAME_ICONS)).toEqual([...GAME_SLUGS])
    const files = Object.values(GAME_ICONS).flatMap((icon) => [icon.src, icon.light].filter((src) => src !== undefined))
    for (const src of files) {
      expect(src).toMatch(/^\/site-kit\/games\/[a-z-]+\.png$/)
      // Vitest runs in the package's root
      expect(existsSync(resolve(`public${src}`)), src).toBe(true)
    }
  })

  it('shows a tile only for the games whose app icon is the same in light and dark mode', () => {
    expect(GAME_SLUGS.filter((slug) => GAME_ICONS[slug].tile)).toEqual(['hexfleet', 'cardtastic'])
  })
})

describe('APP_ICONS', () => {
  it('has an icon for every app, each file in the layer', () => {
    expect(Object.keys(APP_ICONS)).toEqual([...APP_SLUGS])
    for (const { src } of Object.values(APP_ICONS)) {
      expect(src).toMatch(/^\/site-kit\/apps\/[a-z-]+\.png$/)
      // Vitest runs in the package's root
      expect(existsSync(resolve(`public${src}`)), src).toBe(true)
    }
  })

  // Lumber's and SlingScan's app icons are the same in light and dark mode
  it('draws each app as a tile', () => {
    for (const slug of APP_SLUGS) expect(APP_ICONS[slug].tile, slug).toBe(true)
  })
})
