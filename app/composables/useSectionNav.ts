import { onBeforeUnmount, onMounted, ref } from 'vue'

export interface SectionNavOptions {
  /** The first section is the top of the page (jaydeaton.com): it's current before anything has scrolled, and its link
   *  scrolls to the very top, header and all. Leave it off when a hero comes before the first section (www, the games
   *  site): then nothing is current until a section reaches the nav, and every link scrolls to its own section. */
  firstIsTop?: boolean
}

/** A pinned nav's state for the sections on the page, given their element ids in page order: which one is in view, and
 *  a jump to one. Each section's `scroll-margin-top` is where a jump lands it, just under the nav. */
export const useSectionNav = (ids: string[], { firstIsTop = false }: SectionNavOptions = {}) => {
  // Before the page measures: the first section when it's the top of the page, so the prerendered nav marks it, or none
  const first = firstIsTop ? ids[0] : undefined
  const current = ref<string | undefined>(first)

  // What scrolls the page: the window, or a scrolling ancestor of the sections (jaydeaton.com scrolls #__nuxt, with body
  // at overflow: hidden for iOS)
  const scroller = () => {
    for (let el = document.getElementById(ids[0] ?? '')?.parentElement; el; el = el.parentElement) {
      if (/auto|scroll/.test(getComputedStyle(el).overflowY)) return el
    }
    return document.scrollingElement ?? document.documentElement
  }

  // The last section whose top has scrolled up to where a jump would land it. The last sections can be too short to get
  // there, so at the bottom of the page the last one is current. On a page without the sections (a legal page, the
  // games site's 6502 pages) nothing is.
  const update = () => {
    if (!ids.some((id) => document.getElementById(id))) {
      current.value = undefined
      return
    }
    const page = scroller()
    if (page.scrollTop + page.clientHeight >= page.scrollHeight - 1) {
      current.value = ids[ids.length - 1]
      return
    }
    let inView = first
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el && el.getBoundingClientRect().top <= parseFloat(getComputedStyle(el).scrollMarginTop || '0') + 1) inView = id
    }
    current.value = inView
  }

  // Smooth unless the visitor asks for reduced motion
  const behavior = (): ScrollBehavior => (window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth')
  const toTop = () => scroller().scrollTo({ top: 0, behavior: behavior() })
  const jump = (id: string) => {
    if (firstIsTop && id === ids[0]) toTop()
    else document.getElementById(id)?.scrollIntoView({ behavior: behavior() })
  }

  // Scroll events don't bubble, so catch the scroller's on the way down
  onMounted(() => {
    update()
    document.addEventListener('scroll', update, { capture: true, passive: true })
    window.addEventListener('resize', update)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('scroll', update, { capture: true })
    window.removeEventListener('resize', update)
  })

  return { current, jump, toTop, update }
}
