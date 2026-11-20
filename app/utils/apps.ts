import type { AppIconImage } from './games'

/** Every app and web tool with a shared icon, as www.infinitetoken.com lists them: the paid apps first (Lumber, then
 *  SlingScan), then the rest alphabetically */
export const APP_SLUGS = ['lumber', 'slingscan', 'barcoder', 'cashierfu', 'grapdf', 'mapfolio', 'metronomia', 'pixel-designer', 'pixelated', 'snapdf', 'trimbox'] as const

export type AppSlug = (typeof APP_SLUGS)[number]

/** Each app's and web tool's icon, the same on every site. A full-bleed icon is a tile: Lumber's (its iPhone app uses
 *  `dark-icon.png` for light and dark mode), SlingScan's, the web tools' with a colored square (GraPDF, SnaPDF, TrimBox)
 *  and Pixel Designer's. A transparent glyph or round logo is drawn bare: MapFolio's map, Pixelated's P (from its
 *  `icon.svg`, since its `icon-512.png` puts the P on a gray tile), and CashierFu's, Barcoder's and Metronomia's round
 *  logos. The files are in `public/site-kit/apps/` at 192px; CLAUDE.md says where each came from. */
export const APP_ICONS: Record<AppSlug, AppIconImage> = {
  lumber: { src: '/site-kit/apps/lumber.png', tile: true },
  slingscan: { src: '/site-kit/apps/slingscan.png', tile: true },
  barcoder: { src: '/site-kit/apps/barcoder.png' },
  cashierfu: { src: '/site-kit/apps/cashierfu.png' },
  grapdf: { src: '/site-kit/apps/grapdf.png', tile: true },
  mapfolio: { src: '/site-kit/apps/mapfolio.png' },
  metronomia: { src: '/site-kit/apps/metronomia.png' },
  'pixel-designer': { src: '/site-kit/apps/pixel-designer.png', tile: true },
  pixelated: { src: '/site-kit/apps/pixelated.png' },
  snapdf: { src: '/site-kit/apps/snapdf.png', tile: true },
  trimbox: { src: '/site-kit/apps/trimbox.png', tile: true }
}
