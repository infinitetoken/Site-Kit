/** Every platform a product can be on, in the order its chips list them */
export const PLATFORMS = ['web', 'ios', 'android', 'mac', 'windows', 'linux'] as const

export type Platform = (typeof PLATFORMS)[number]

/** Where a platform's chip goes: a store listing or download page (`https://...`), a page on the same site (`/...`), or
 *  `'soon'` for a platform the product is coming to, which shows as a dashed chip with no link. Link a store listing
 *  only once it's live. */
export type PlatformLink = `https://${string}` | `/${string}` | 'soon'

/** A product's platforms: leave out any it isn't on and isn't coming to */
export type Platforms = Partial<Record<Platform, PlatformLink>>

/** Each platform's name on its chip. iOS covers iPad too, so it names both devices. */
export const PLATFORM_LABELS: Record<Platform, string> = {
  web: 'Web',
  ios: 'iPhone and iPad',
  android: 'Android',
  mac: 'Mac',
  windows: 'Windows',
  linux: 'Linux'
}

export type PlatformChip = { platform: Platform; label: string; href?: string }

/** A product's chips: the platforms it's on, then the ones it's coming to, each group in `PLATFORMS` order */
export function platformChips(platforms: Platforms): PlatformChip[] {
  const chips = PLATFORMS.flatMap((platform) => {
    const link = platforms[platform]
    if (!link) return []
    return [{ platform, label: PLATFORM_LABELS[platform], href: link === 'soon' ? undefined : link }]
  })
  return [...chips.filter((chip) => chip.href), ...chips.filter((chip) => !chip.href)]
}
