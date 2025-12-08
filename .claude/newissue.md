# Optimized Gemini CLI Prompt for Image Carousel Implementation

I need to fix an image carousel implementation. Here are the current files and requirements:

## CONTEXT:
- I've already modified `@Layout.astro` (DO NOT change existing code here, only add if needed)
- Created `@ImageCarousel.svelte` (this is what I CAN modify)
- Created `@rehype-component-carousel.mjs` (markdown processor)

## REQUIREMENTS:
1. Make the image carousel work exactly as intended
2. Only modify `@ImageCarousel.svelte` component
3. Only ADD to `@Layout.astro` if absolutely necessary (no changes to existing code)

## CURRENT ISSUE:
The carousel isn't functioning correctly. Need to identify and fix the specific problems.

## TO INVESTIGATE:
1. Check `@ImageCarousel.svelte` for:
   - Component lifecycle issues
   - Event handling problems
   - State management flaws
   - Prop/event bindings
   - CSS/JavaScript interactions

2. Check integration between:
   - Rehype component → Svelte component
   - Markdown parsing → Component props
   - Layout → Component mounting

3. Verify:
   - Are images/data properly passed from rehype?
   - Is the Svelte component receiving correct props?
   - Are there any console errors?
   - Is the component mounted correctly?

## ACTION REQUIRED:
Analyze the current `@ImageCarousel.svelte` code and provide:
1. Specific fixes needed in the Svelte component
2. Minimal additions to `@Layout.astro` if required (explain why)
3. Clear implementation steps

Please provide concise, actionable solutions focused only on making the carousel work as intended.

