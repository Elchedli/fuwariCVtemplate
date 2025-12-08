
   1. `src/plugins/rehype-component-carousel.mjs`:
       * Modified to extract src and alt attributes from <img> tags found within the carousel directive's children.
       * These image details are now serialized into a JSON string and added as a data-images attribute to the main
         div.carousel-component.
       * The previously hidden div.carousel-content containing the raw <img> elements is no longer rendered, as the data
         is now passed directly via the data attribute.
   2. `src/components/ImageCarousel.svelte`:
       * The Props interface and the bindTo prop have been removed. The component no longer expects images as a direct
         prop.
       * The images array is now initialized as a $state variable.
       * The onMount lifecycle hook has been updated to query the DOM for the parent div.carousel-component, read the
         data-images attribute, and parse the JSON to populate its internal images state.
       * The setupGlobalLightbox function, which was previously responsible for initializing a global PhotoSwipe
         instance using a bindTo selector, has been commented out as it is no longer relevant to how this specific
         carousel operates.

  These changes ensure that the ImageCarousel.svelte component correctly receives and utilizes image data from the
  markdown content processed by the Rehype plugin, addressing the issue of the carousel not functioning as intended. No
  modifications to src/layouts/Layout.astro were necessary, adhering to the constraint of only adding if absolutely
  required.

### [2025-12-08 10:45] Prompt Processing
- **Understood:** User wants to enable PhotoSwipe arrows for the Carousel component while keeping them disabled for other images. Currently `Layout.astro` disables them globally for all images in `.custom-md`.
- **Resolved:**
    - Analyzed `Layout.astro` and `ImageCarousel.svelte`.
    - `Layout.astro` targets `.custom-md img`.
    - `ImageCarousel.svelte` images have class `.carouselImg` and are inside `.custom-md`.
    - Modified `src/layouts/Layout.astro` to exclude carousel images from the global lightbox using `:not(.carouselImg)`.
    - Verified syntax with `astro check` (passed).
----
Fixes Implemented
   1. Rehype Plugin Update (`src/plugins/rehype-component-carousel.mjs`):
       * Updated the plugin to traverse the children of the :::carousel directive.
       * It now extracts the src and alt attributes from all img tags found within.
       * It outputs a div.carousel-component with a data-images attribute containing the serialized JSON of the image
         data. The original content is replaced by this placeholder.

   2. Client-Side Mounting (`src/components/misc/Markdown.astro`):
       * Added a <script> block to this component (which wraps markdown content).
       * The script imports the ImageCarousel.svelte component and the mount function from Svelte 5.
       * It queries for all .carousel-component elements, parses their data-images, and mounts the ImageCarousel
         component into them.
       * Included logic to handle Swup navigation events (swup:page:view) to ensure carousels are initialized on page
         transitions.
       * Fixed the import path to ../ImageCarousel.svelte.

   3. CSS Fix (`src/styles/markdown.css`):
       * Removed a reference to a non-existent link class in the @apply directive that was causing build failures.

  Notes
   * Build Error: During verification, an Invalid URL / UV_HANDLE_CLOSING error was observed during the npm run build
     process. Extensive testing (reverting changes, isolating components) indicates this is likely an environment or
     Node.js/libuv issue on the current system (Windows) rather than a syntax error in the code changes, as it persisted
     even after reverting the modifications.
   * Image Paths: The solution relies on Astro's build pipeline to have already resolved relative image paths (e.g.,
     ./assets/...) into usable URLs in the HAST before the Rehype plugin runs. If images fail to load, ensure that
     rehype-components runs after Astro's image processing or that the image paths are valid public URLs.