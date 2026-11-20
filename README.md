# @infinitetoken/site-kit

A Nuxt 4 layer shared by Infinite Token's websites (www.infinitetoken.com, games.infinitetoken.com and jaydeaton.com). It holds what those sites would otherwise copy between them: the Infinite Token logo, its animated ring stack and the favicons; the pinned nav's tracking of which section is in view; platform chips, one row per product that names every platform it's on and links each to its store or download page; and the apps' and games' icons, so every site draws each one the same way.

## Install

```bash
npm install @infinitetoken/site-kit
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: ['@infinitetoken/site-kit']
})
```

Nuxt auto-imports the layer's components, composables and utils, the same as the site's own, and serves its `public/` files under `/site-kit/`.

## Logo

- **Files:** `/site-kit/brand/logo.svg` (the three stacked rings, for a header or footer), `/site-kit/brand/ring.svg` (one ring, the official vector) and the favicons, `/site-kit/brand/favicon.svg`, `favicon.ico` (48px) and `favicon.png` (192px, for crawlers that want a PNG). Link the favicons from the site's `app.head`, and redirect `/favicon.ico` to the `.ico` for browsers that ask for it without a link.
- **`<LogoStack />`:** the animated logo: rings drop onto a stack of three, one at a time, on a canvas. `width` sets its drawn width in CSS pixels (160 by default); its height follows. It's decorative (`aria-hidden`), and it fades in once the ring has loaded.

## Section nav

```ts
const { current, jump, toTop, update } = useSectionNav(['apps', 'games', 'about', 'team'])
```

For a pinned nav whose tabs are the page's sections, given their element ids in page order. `current` is the section in view (the last one whose top has reached its `scroll-margin-top`, or the last one at the bottom of the page), for the tab to mark; `jump(id)` scrolls to a section, smoothly unless the visitor asks for reduced motion; `toTop()` scrolls to the top; `update()` measures again (after the page changes). It follows the window or a scrolling ancestor of the sections.

- **`firstIsTop`:** pass `{ firstIsTop: true }` when the first section is the top of the page: it's current from the start, and its tab scrolls to the very top. Without it, as when a hero comes first, nothing is current until a section reaches the nav.

## Platform chips

```ts
import type { Platforms } from '@infinitetoken/site-kit/platforms'

const lumber: Platforms = {
  ios: 'https://apps.apple.com/app/id6767543372',
  mac: 'https://apps.apple.com/app/id6767543372?mt=12',
  windows: 'https://apps.microsoft.com/detail/9NCGDHB49MFR',
  linux: 'https://lumber.infinitetoken.com/download#linux',
  android: 'soon'
}
```

```vue
<PlatformChips :platforms="lumber" name="Lumber" class="text-zinc-400" />
```

- **Platforms:** `web`, `ios` (shown as iPhone and iPad), `android`, `mac`, `windows` and `linux`. Leave out any a product isn't on.
- **Links:** a store listing or download page (`https://...`, opens in a new tab), a page on the same site (`/...`), or `'soon'`, which shows a dashed chip with no link. Link a store listing only once it's live.
- **Order:** the platforms a product is on come first, then the ones it's coming to, each in the order above.
- **Props:** `platforms`; `name`, which gives each link an accessible name like "Lumber for Windows"; and `label`, the caption above the chips ("Available On" by default, `''` to leave it off).
- **Colors:** the chips take the text color the site sets on the component, so they fit dark and light cards without any site CSS.
- **Icons:** device shapes from [Lucide](https://lucide.dev), not brand logos. `<PlatformIcon platform="mac" />` draws one on its own.

`platformChips(platforms)`, `PLATFORMS` and `PLATFORM_LABELS` are exported for sites that lay chips out themselves.

## App and game icons

```ts
import { GAME_ICONS } from '@infinitetoken/site-kit/games'

const hexfleet = { name: 'HexFleet', icon: GAME_ICONS.hexfleet }
```

```vue
<AppIcon :icon="hexfleet.icon" :size="56" />
```

- **`GAME_ICONS`:** each game's icon by slug (`hexfleet`, `hangman`, `cardtastic`, `dueltastic`, `pucktastic` and `swirlio`, listed in `GAME_SLUGS` in the sites' order). The images are 192px PNGs the layer serves from `/site-kit/games/`, so a site needs no copies of its own.
- **Which art:** a game whose app icon is the same in light and dark mode shows that icon as a tile (HexFleet, CardTastic). One whose app icon changes with the mode shows its transparent splash art, which reads on light and dark cards alike, and Swirlio's has a version for light pages.
- **`APP_ICONS`:** the same for the apps and web tools (`lumber`, `slingscan`, `barcoder`, `cashierfu`, `grapdf`, `mapfolio`, `metronomia`, `pixel-designer`, `pixelated`, `snapdf` and `trimbox`, in `APP_SLUGS`), from `@infinitetoken/site-kit/apps`, served from `/site-kit/apps/`. A full-bleed icon is a tile (Lumber, SlingScan, GraPDF, SnaPDF, TrimBox, Pixel Designer); a transparent glyph or round logo is drawn bare (MapFolio, Pixelated, CashierFu, Barcoder, Metronomia).
- **`AppIcon`:** draws any `AppIconImage` (`{ src, light?, tile? }`), a game's or a site's own, at `size` CSS pixels. A `tile` is rounded like a home screen icon, with a faint ring. It's decorative (`alt=""`), so put the name beside it.
- **`color-mode`:** `'dark'` (the default) for a dark-only site, which always draws `src`; `'auto'` for a site with light and dark modes, which draws `light` unless `<html>` has the `dark` class, as [@nuxtjs/color-mode](https://color-mode.nuxtjs.org) sets it.

## License

MIT. The icons are Lucide's, under the ISC License; see [LICENSE](LICENSE).

---

Made by [Infinite Token](https://www.infinitetoken.com), the team behind [Lumber](https://lumber.infinitetoken.com): end-to-end encrypted logging.
