import { describe, expect, it } from 'vitest'

import { PLATFORM_LABELS, platformChips, PLATFORMS } from '../app/utils/platforms'

describe('platformChips', () => {
  it('lists the platforms a product is on before the ones it is coming to, each in PLATFORMS order', () => {
    const chips = platformChips({ android: 'soon', linux: '/download#linux', ios: 'https://apps.apple.com/app/id1', windows: 'https://apps.microsoft.com/detail/X', mac: 'soon' })
    expect(chips.map((chip) => chip.platform)).toEqual(['ios', 'windows', 'linux', 'android', 'mac'])
  })

  it('links every platform but the ones marked soon', () => {
    const chips = platformChips({ web: '/pucktastic/', android: 'soon' })
    expect(chips).toEqual([
      { platform: 'web', label: 'Web', href: '/pucktastic/' },
      { platform: 'android', label: 'Android', href: undefined }
    ])
  })

  it('leaves out platforms a product is not on', () => {
    expect(platformChips({})).toEqual([])
    expect(platformChips({ mac: 'https://apps.apple.com/app/id1?mt=12' })).toHaveLength(1)
  })

  it('has a label for every platform', () => {
    for (const platform of PLATFORMS) expect(PLATFORM_LABELS[platform]).toBeTruthy()
  })
})
