# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

# @infinitetoken/site-kit

A Nuxt 4 layer shared by Jay's Nuxt sites: InfiniteToken-WWW (www.infinitetoken.com), Games-Web (games.infinitetoken.com) and JayDeaton-Web (jaydeaton.com). Created 2026-11-13, when Lumber shipped on Windows and Linux and the games and Swirlio headed to Google Play: each site showed platforms its own way (InfiniteToken-WWW a row of Apple-logo badges plus a separate "Download on ..." link list, Games-Web App Store and Google Play buttons, jaydeaton.com text links), so Jay chose one shared layer over copying, and named it (a layer rather than a narrow package, so `useSectionNav` and `LogoStack.vue`, copied between the sites today, can move in later).

## Commands

```bash
npm run lint       # eslint .
npm run fix        # eslint . --fix
npm run typecheck  # vue-tsc --noEmit
npm test           # Vitest (test/), happy-dom, @vitejs/plugin-vue
npm run verify     # lint + typecheck + test; CI runs this
npm run release:patch / :minor / :major   # Jay's release flow: bump, tag, push; the tag publishes
```

## Layout

- `nuxt.config.ts` is the layer's config (empty) and the package's `main`. Write `main` without a leading `./`: with `./nuxt.config.ts`, npm 11 left the file out of the tarball although `package-json/no-redundant-files` says `main` is always packed, so the layer would have published without its config.
- `app/` is the layer's source (Nuxt 4's default `srcDir`, for layers too): `app/components` and `app/utils` are auto-imported in every site that extends it. `./platforms` is also exported for a site's data files, which import its types (`import type { Platforms } from '@infinitetoken/site-kit/platforms'`). The package ships TypeScript and SFCs as source; Nuxt transpiles layers.
- Components import each other explicitly (`PlatformChips` imports `PlatformIcon`), so the tests can mount them without Nuxt.

## Platform chips

- `Platforms` is `Partial<Record<'web' | 'ios' | 'android' | 'mac' | 'windows' | 'linux', PlatformLink>>`. A link is `https://...` (a store listing or download page, opened in a new tab), `/...` (a page on the same site), or `'soon'` (a dashed chip with no link: a platform the product is coming to). Store listings are linked only once live; the site-alignment skill checks each game against the stores.
- `ios` is labelled "iPhone and iPad". Chips list live platforms first, then `'soon'` ones, each in `PLATFORMS` order.
- The icons are device shapes from Lucide (ISC, notice in `LICENSE`), not brand logos: Apple's trademark rules keep its logo off third-party pages outside its official badges, and the old InfiniteToken-WWW badges used it.
- Styling is scoped plain CSS driven by `currentColor` (`color-mix` for borders and hover), so a site sets one text color on the component and it fits dark-only InfiniteToken-WWW and Games-Web and light/dark jaydeaton.com without Tailwind scanning `node_modules`.
- The caption defaults to "Available On" (Title Case, Jay's rule for UI copy).

## Dependencies

TypeScript is on 6.x on purpose: typescript-eslint 8.72.2 (the newest, 2026-11-13) only supports TypeScript below 6.1 and crashes on 7.0 (`ts-api-utils` reads `TypeFlags.Intrinsic`). Move to 7 when typescript-eslint's peer range allows it. Everything else is on its latest.

## Release

Tag-based like the other `@infinitetoken` packages: `publish.yml` runs `npm publish` on `v*` tags with npm trusted publishing (configured on npmjs.com for `infinitetoken/Site-Kit` and `publish.yml`). 0.1.0 was published by hand on 2026-11-13, the first publish of a new package; setting up trusted publishing before the package existed left npm's `0.0.0-stage` placeholder version ("Temporary package placeholder for staged publishing"), which no `^` range matches. The three sites depend on `^0.1.0`. To try a change in a site before releasing it, `npm pack` here and install the tarball there (a `file:../Site-Kit` folder link would load this repo's own Vue), then restart its dev server, which caches the old copy.