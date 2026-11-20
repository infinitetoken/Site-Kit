import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, nextTick } from 'vue'

import { type SectionNavOptions, useSectionNav } from '../app/composables/useSectionNav'

const IDS = ['about', 'projects', 'packages', 'games']
// Where a jump lands a section: its scroll-margin-top, as on the page
const LANDING = 72
const VIEWPORT = 800

const mountNav = (options?: SectionNavOptions) =>
  mount(
    defineComponent({
      setup: () => useSectionNav(IDS, options),
      render: () => null
    }),
    { attachTo: document.body }
  )
// The page scrolls inside an element, as #__nuxt does on jaydeaton.com, not the window
const page = () => document.getElementById('__page')!
// happy-dom lays nothing out, so each section's top and how far the page can scroll are whatever the test says
const layout = (tops: number[], { atBottom = false } = {}) => {
  IDS.forEach((id, i) => vi.spyOn(document.getElementById(id)!, 'getBoundingClientRect').mockReturnValue({ top: tops[i] } as DOMRect))
  Object.defineProperty(page(), 'clientHeight', { configurable: true, value: VIEWPORT })
  Object.defineProperty(page(), 'scrollHeight', { configurable: true, value: atBottom ? page().scrollTop + VIEWPORT : 10000 })
}
const scroll = async () => {
  page().dispatchEvent(new Event('scroll'))
  await nextTick()
}

describe('useSectionNav', () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="__page" style="overflow-y: auto">${IDS.map((id) => `<div id="${id}" style="scroll-margin-top: ${LANDING}px"></div>`).join('')}</div>`
  })

  afterEach(() => {
    vi.restoreAllMocks()
    document.body.innerHTML = ''
  })

  it('marks the last section that has scrolled up to its landing spot', async () => {
    layout([0, 500, 1500, 2500])
    const wrapper = mountNav({ firstIsTop: true })
    expect(wrapper.vm.current).toBe('about')
    layout([-1200, -700, LANDING, 1100])
    await scroll()
    expect(wrapper.vm.current).toBe('packages')
    layout([-1200, -700, LANDING + 2, 1100])
    await scroll()
    expect(wrapper.vm.current).toBe('projects')
  })

  it('marks nothing until a section reaches the nav when a hero comes first', async () => {
    layout([600, 1100, 2100, 3100])
    const wrapper = mountNav()
    expect(wrapper.vm.current).toBeUndefined()
    layout([LANDING, 500, 1500, 2500])
    await scroll()
    expect(wrapper.vm.current).toBe('about')
  })

  it('marks the last section at the bottom of the page, even when it is too short to reach its landing spot', async () => {
    layout([-3000, -2500, -1500, 300])
    const wrapper = mountNav()
    expect(wrapper.vm.current).toBe('packages')
    layout([-3000, -2500, -1500, 300], { atBottom: true })
    await scroll()
    expect(wrapper.vm.current).toBe('games')
  })

  it('marks nothing on a page without the sections', () => {
    document.body.innerHTML = '<div id="__page"></div>'
    expect(mountNav({ firstIsTop: true }).vm.current).toBeUndefined()
  })

  it('scrolls to the top for the first section when it is the top of the page, and smoothly to the others, instantly with reduced motion', () => {
    layout([0, 500, 1500, 2500])
    const { vm } = mountNav({ firstIsTop: true })
    const toTop = vi.fn()
    page().scrollTo = toTop
    const intoView = vi.fn()
    document.getElementById('games')!.scrollIntoView = intoView
    vm.jump('about')
    expect(toTop).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
    vm.jump('games')
    expect(intoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true } as MediaQueryList)
    vm.jump('games')
    expect(intoView).toHaveBeenLastCalledWith({ behavior: 'auto' })
  })

  it('scrolls the first section into view like the rest when a hero comes first', () => {
    layout([600, 1100, 2100, 3100])
    const { vm } = mountNav()
    const intoView = vi.fn()
    document.getElementById('about')!.scrollIntoView = intoView
    vm.jump('about')
    expect(intoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })
})
