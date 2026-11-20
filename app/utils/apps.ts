import type { AppIconImage } from './games'

/** Every app with a shared icon, paid ones first like the sites list them (Lumber, then SlingScan) */
export const APP_SLUGS = ['lumber', 'slingscan'] as const

export type AppSlug = (typeof APP_SLUGS)[number]

/** Each app's icon, the same on every site, by the games' rule: an app icon that's the same in light and dark mode is
 *  drawn as that icon, a tile. Lumber's iPhone app uses `dark-icon.png` for both modes and SlingScan has one
 *  `icon.png`, so both are tiles. The files are in `public/site-kit/apps/` at 192px, from each app's repo. */
export const APP_ICONS: Record<AppSlug, AppIconImage> = {
  lumber: { src: '/site-kit/apps/lumber.png', tile: true },
  slingscan: { src: '/site-kit/apps/slingscan.png', tile: true }
}
