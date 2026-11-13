# @infinitetoken/site-kit

A Nuxt 4 layer shared by Infinite Token's websites (www.infinitetoken.com, games.infinitetoken.com and jaydeaton.com). It holds what those sites would otherwise copy between them, starting with platform chips: one row per product that names every platform it's on and links each to its store or download page.

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

Nuxt auto-imports the layer's components and utils, the same as the site's own.

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

## License

MIT. The icons are Lucide's, under the ISC License; see [LICENSE](LICENSE).
