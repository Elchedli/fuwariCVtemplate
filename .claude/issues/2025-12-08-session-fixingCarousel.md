
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