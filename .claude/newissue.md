## CONTEXT:
- I've already modified `@Layout.astro` (DO NOT change existing code here, only add if needed)
- Created `@ImageCarousel.svelte` (this is what I CAN modify).
- Created `@rehype-component-carousel.mjs` (markdown processor)

## CURRENT ISSUE:
**photoSwup integration :** so i have image component which have swupPhoto prev & next arrows disabled which is perfect but the carousel needs to have them. Find a way to either create separate ones that doesn't interact with each other or a small change that can differentiate between the two like a class change.

## TO INVESTIGATE:
1. Check `@Layout.astro`
2. Check `@ImageCarousel.svelte`

## ACTION REQUIRED:
Analyze the current `@ImageCarousel.svelte` code and provide:
1. Specific fixes needed in the Svelte component
2. Minimal additions to `@Layout.astro` if required (explain why)
3. Clear implementation steps
