import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import PlatformChips from '../app/components/PlatformChips.vue'

const lumber = { ios: 'https://apps.apple.com/app/id1', windows: 'https://apps.microsoft.com/detail/X', android: 'soon' } as const

describe('PlatformChips', () => {
  it('links each live platform and shows the coming ones without a link', () => {
    const wrapper = mount(PlatformChips, { props: { platforms: lumber, name: 'Lumber' } })
    const links = wrapper.findAll('a')
    expect(links.map((a) => a.attributes('href'))).toEqual([lumber.ios, lumber.windows])
    expect(links.map((a) => a.attributes('aria-label'))).toEqual(['Lumber for iPhone and iPad', 'Lumber for Windows'])
    const soon = wrapper.find('.platform-chip--soon')
    expect(soon.text()).toContain('Android')
    expect(soon.text()).toContain('Soon')
    expect(soon.element.tagName).toBe('SPAN')
  })

  it('opens store listings in a new tab and pages on the same site in this one', () => {
    const wrapper = mount(PlatformChips, { props: { platforms: { web: '/pucktastic/', ios: 'https://apps.apple.com/app/id1' } } })
    const [web, ios] = wrapper.findAll('a')
    expect(web.attributes('target')).toBeUndefined()
    expect(ios.attributes('target')).toBe('_blank')
    expect(ios.attributes('rel')).toBe('noopener')
  })

  it('labels the list with its caption, which can be left off', () => {
    const wrapper = mount(PlatformChips, { props: { platforms: lumber } })
    const caption = wrapper.find('.platform-chips__label')
    expect(caption.text()).toBe('Available On')
    expect(wrapper.find('ul').attributes('aria-labelledby')).toBe(caption.attributes('id'))
    const bare = mount(PlatformChips, { props: { platforms: lumber, label: '' } })
    expect(bare.find('.platform-chips__label').exists()).toBe(false)
    expect(bare.find('ul').attributes('aria-labelledby')).toBeUndefined()
  })

  it('renders nothing for a product with no platforms', () => {
    expect(mount(PlatformChips, { props: { platforms: {} } }).html()).not.toContain('<ul')
  })
})
