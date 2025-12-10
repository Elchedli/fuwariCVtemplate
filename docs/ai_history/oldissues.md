**Goal:** Create a Rehype plugin (or a solution implemented via MDX/React) to render a specific Markdown block as an interactive, client-side Swup carousel component, while ensuring all other images are rendered normally.

-----

### **1. Input Syntax (The Markdown/MDX Block)**

The component should parse the following specific syntax:

```markdown
::carousel
![Image 1 Description](image1.png)
![Image 2 Description](image2.png)
![Image 3 Description](image3.png)
::
```

  * The block is demarcated by `::carousel` and `::`.
  * The content inside is a list of standard Markdown image syntax (`![alt/description](source)`).

-----

### **2. Output Requirement (The Carousel Component)**

The Rehype plugin/MDX transformer should convert the input syntax into a structure (e.g., HTML/JSX) that fulfills the following client-side features:

  * **Swup Integration:** The resulting HTML structure **must** be designed to be compatible with Swup's dynamic content handling (i.e., the carousel logic/state should be contained within the rendered component).
  * **Navigation:** The carousel must include **left and right arrow controls** for cycling through the images.
  * **Caption/Description:** A visible element at the **bottom** of the carousel must display the **image description** (the text inside the `[]` of the Markdown image link) for the currently active image.
  * **Image Rendering:** All images within this block should be rendered *inside* the carousel structure.

-----

### **3. Constraint (Normal Image Rendering)**

  * **Crucial:** All other standard Markdown images that are **not** inside the `::carousel ::` block must render as plain, unstyled `<img>` tags, retaining their normal behavior and structure.

  --------------------------------------------------------------

  Here is an optimized version of that specific follow-up prompt. It translates your feedback into clear, actionable technical instructions that will help the AI understand exactly where it went wrong and what to build instead.

### ✂️ Optimized Follow-Up Prompt

> **"The previous solution was incorrect. It rendered a pagination menu/list but failed to display the actual images. Please revise the code with these specific corrections:**
>
> 1.  **Render the Active Image:** The component must display the **full visible image** (based on the current state), not a text menu or a list of links.
> 2.  **Click-to-Advance Interaction:** Do not create a separate pagination bar. Instead, **the image itself must be the trigger**. When the user clicks the active image, it should trigger the Swup transition to the next slide.
> 3.  **Layout:** Display the image centrally with its description (alt text) strictly at the bottom.
>
> **Please rewrite the component to prioritize the image display and attach the 'next slide' click event directly to the image element."**

---------------------------------------------------------------
Create a modal image carousel that meets these specific requirements:

## Current Setup
- Using Svelte with Swup for page transitions
- Markdown syntax: `:::carousel` blocks containing multiple images with descriptions
- Currently showing individual images with `@image1`, `@image2` references

## Desired Behavior

### Initial State
- Display only the FIRST image from the carousel block as a normal inline image
- Image should be clickable (with visual cue like cursor: pointer)

### Modal Carousel on Click
When clicking the main image:
1. Open a full-screen/modal overlay
2. Show the clicked image prominently in the center
3. Display navigation:
   - Left/right arrows for previous/next (with hover effects)
   - Close button (top-right corner, "X" icon)
4. Thumbnail strip at the bottom showing ALL carousel images
   - Current image highlighted in thumbnail strip
   - Thumbnails are clickable to jump to specific image
   - Smooth horizontal scrolling if thumbnails overflow
5. Image description displayed below main image (centered, styled text)

### Functionality Requirements
- Click outside main image (on overlay backdrop) closes modal
- Keyboard navigation (left/right arrow keys, Escape to close)
- Smooth transitions between images (fade/slide animation)
- Description updates for each image change
- Swup-compatible (events properly cleaned up on page transitions)

### Styling Requirements
- Modern, clean design with semi-transparent backdrop
- Arrows: minimal design, appear on hover
- Thumbnails: bordered with active state indicator
- Description: elegant typography, good contrast
- Responsive design for mobile/tablet

### Implementation Notes
- Use existing `src/components/ImageCarousel.svelte` as base
- Parse markdown `:::carousel` blocks to extract images and alt-text as descriptions
- Ensure only ONE instance of carousel modal exists at a time
- Optimize image loading (lazy load thumbnails, preload adjacent images)

### Expected Markdown Transformation
From:
```markdown
:::carousel
![Description 1](./assets/carousel_login/1.png)
![Description 2](./assets/carousel_login/2.png)
![Description 3](./assets/carousel_login/3.png)
:::

----------------------------------------------------


Fix Svelte component hydration errors in Astro project with the following specifics:

## Current Errors
```
[astro-island] Error hydrating /src/components/Search.svelte TypeError: Cannot read properties of undefined (reading 'call')
[astro-island] Error hydrating /src/components/widget/DisplaySettings.svelte TypeError: Cannot read properties of undefined (reading 'call')
[astro-island] Error hydrating /src/components/LightDarkSwitch.svelte TypeError: Cannot read properties of undefined (reading 'call') ```

## Technical Context
- Astro project with Svelte components
- Using Swup for page transitions
- Components are rendered as Astro islands
- Recently modified carousel component may have affected dependencies

## Required Fixes

### 1. **Hydration Error Root Causes** (Diagnose & Fix)
- Check for Svelte component props being undefined during hydration
- Verify `bind:this` references aren't accessed before component mounts
- Ensure no lifecycle method (onMount, beforeUpdate) calls undefined functions
- Validate all reactive statements have proper dependency tracking

### 2. **Common Hydration Issues to Resolve**
#### For Search.svelte:
- Ensure search input bindings don't reference undefined stores/state
- Check autocomplete/suggestion logic for race conditions

#### For DisplaySettings.svelte:
- Verify theme/store references exist before component hydration
- Check localStorage/sessionStorage access in onMount

#### For LightDarkSwitch.svelte:
- Confirm theme toggle functions are properly imported/bound
- Check media query listeners for SSR mismatch

### 3. **Specific Code Checks**
```javascript
// Common patterns causing "reading 'call'" error:
- Event handlers: `on:click={undefinedFunction}`
- Bindings: `bind:value={undefinedStore}`
- Actions: `use:undefinedAction`
- Component props: `<Component {undefinedProp}>`
- Dynamic imports: `import()` that resolves to undefined
```

### 4. **Svelte-Astro Integration Fixes**
- Ensure all Svelte components have proper client directives:
  ```astro
  <Search client:load />  // vs client:idle, client:visible, client:only
  ```
- Check for missing `svelte-preprocess` in Astro config
- Verify Svelte and Astro package versions are compatible

### 5. **Swup-Specific Fixes**
- Add Swup event listeners for component cleanup:
  ```javascript
  onMount(() => {
    if (typeof window !== 'undefined') {
      swup.on('contentReplaced', cleanup);
    }
  });
  ```
- Ensure components re-hydrate properly after Swup page transitions
- Check for DOM element references that persist between page swaps

### 6. **Build & Configuration**
#### astro.config.mjs checks:
```javascript
export default defineConfig({
  integrations: [svelte()],  // Ensure Svelte integration exists
  vite: {
    ssr: {
      noExternal: ['@sveltejs/kit/*']  // May need to adjust
    }
  }
});
```

#### package.json version checks:
- `svelte`: "^4.0.0" or compatible
- `@astrojs/svelte`: Latest stable
- No duplicate Svelte versions in dependencies

### 7. **Testing Steps After Fix**
1. **Build verification**: `npm run build` (no errors)
2. **Dev server**: `npm run dev` (components hydrate without errors)
3. **Console check**: No hydration warnings in browser console
4. **Swup navigation**: Components work across page transitions
5. **Mobile responsiveness**: Components work on all screen sizes

### 8. **Fallback Strategy**
If immediate fix isn't possible:
- Use `client:only="svelte"` directive for problematic components
- Implement error boundaries with `{#catch error}` blocks
- Add loading states while components hydrate

## Expected Outcome
- All three components (Search, DisplaySettings, LightDarkSwitch) hydrate without errors
- No console warnings about hydration mismatches
- Components remain functional with Swup page transitions
- Original carousel functionality preserved

----------------------------------------------------------------

## [2025-12-03] Modify the carousel component

### Request
Modify the carousel component : 
   **Scroll Locking:** When the modal is open (`isOpen = true`), prevent the background `<body>` from scrolling (use `<svelte:body>` or a reactive statement).
  **Image Selector Strip**. The component should display a large main image with 2-8 smaller, horizontally scrolling thumbnail images beneath it. The thumbnails must be clickable to change the main image. Include placeholder images and minimal, modern styling.

### Resolution
- **Refactored Scroll Locking:** Replaced imperative `document.body.style.overflow` manipulation with declarative `<svelte:body style:overflow={...} />` in `src/components/ImageCarousel.svelte`.
- **Enhanced Component Props:** Updated `images` prop to be optional.
- **Added Placeholders:** Added default placeholder images (using placehold.co) to the `images` prop to ensure the component renders with visual content even when no props are provided, satisfying the "Include placeholder images" requirement.
- **Verification:** Ran `npm run check` which passed with 0 errors.

----

1. **Scroll Locking & Zoom Behavior**
    - Disable page scrolling when modal is open
    - Replace scroll with zoom functionality (matching swup.js default behavior)

2. **Image Selector Strip Component**
    - Display large primary image at top
    - Add 2-8 horizontally scrollable thumbnails below
    - Make thumbnails clickable to swap main image
    - Use placeholder images with minimal, modern styling
    - Center the entire component

3. **Tab Implementation**
    - Use CSS tab styling (background colors, not background images)
    - Prevent swup.js route triggering on tab selection
    - Tabs should only swap the displayed main image

---------

**Issue: Refactor PhotoSwipe implementation to use reusable Svelte component in Astro Layout**

**Current Situation:**
- Existing PhotoSwipe implementation already built
- Manual DOM manipulation for gallery functionality

**Requirement:**
existing Svelte component @ImageCarousel.svelte for PhotoSwipe gallery functionality and integrate it into `@Layout.astro` to replace custom implementations.

-----
You forgot to add those : 
  * **Navigation:** The carousel must include **left and right arrow controls** for cycling through the images.
  * **Caption/Description:** A visible element at the **bottom** of the carousel must display the **image description** (the text inside the `[]` of the Markdown image link) for the currently active image.

-----

? Current Behavior
When a user clicks on an open image within the carousel:
It closes the carousel view (lightbox/modal) entirely.
It fails to perform the expected action (upscaling/zooming the image).

?? Missing Transition
The images in this carousel lack the expected animation (specifically the 'zoom transition' often associated with PhotoSwipe), resulting in a sudden, static display change instead of a fluid transition, which contrasts with the correct behavior seen in layout.astro.

**Resolution:**
Modified src/components/ImageCarousel.svelte to fix click behavior (changed action from close to zoom) and added zoom transition by implementing getThumbBoundsFn and binding the main image element.
