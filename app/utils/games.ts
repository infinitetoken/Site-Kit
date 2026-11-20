/** An app's or game's icon, as `AppIcon` draws it */
export interface AppIconImage {
  /** The icon on a dark page, and on any page when it has no `light` */
  src: string
  /** A version for light pages, drawn instead of `src` when `AppIcon` follows the color mode (`color-mode="auto"`) */
  light?: string
  /** A full-bleed square, rounded like a home screen icon, rather than transparent art drawn bare */
  tile?: boolean
}

/** Every game with a shared icon, in the order the sites list them (HexFleet, then Hangman ahead of CardTastic, since
 *  it's becoming AlphaTastic, then the other Tastic games alphabetically, then Swirlio) */
export const GAME_SLUGS = ['hexfleet', 'hangman', 'cardtastic', 'dueltastic', 'pucktastic', 'swirlio'] as const

export type GameSlug = (typeof GAME_SLUGS)[number]

/** Each game's icon, the same on every site. A game whose app icon is the same in light and dark mode shows that icon
 *  as a tile (HexFleet's ship in space, CardTastic's aces on felt). One whose app icon changes with the mode shows its
 *  transparent splash art instead, which reads on light and dark cards alike, and Swirlio's white spiral swaps for its
 *  black one on light pages. The files are in `public/site-kit/games/` at 192px, from each game's repo: `icon.png` or
 *  `icon-dark.png` for a tile, `splash-dark.png` (Swirlio's `dark-splash.png` and `light-splash.png`) for the rest. */
export const GAME_ICONS: Record<GameSlug, AppIconImage> = {
  hexfleet: { src: '/site-kit/games/hexfleet.png', tile: true },
  hangman: { src: '/site-kit/games/hangman.png' },
  cardtastic: { src: '/site-kit/games/cardtastic.png', tile: true },
  dueltastic: { src: '/site-kit/games/dueltastic.png' },
  pucktastic: { src: '/site-kit/games/pucktastic.png' },
  swirlio: { src: '/site-kit/games/swirlio.png', light: '/site-kit/games/swirlio-light.png' }
}
