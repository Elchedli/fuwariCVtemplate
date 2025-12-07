### 2025-12-07 Prompt Processing
- **Understood:** The user requested to re-apply all previous changes after stating that some were forgotten from a context file.
- **Resolved:**
    - Re-applied modifications to `src/components/ImageCarousel.svelte`:
        - Replaced custom modal logic with PhotoSwipeLightbox.
        - Added `bindTo` prop for global lightbox functionality.
        - Integrated Swup hooks for global mode.
        - Implemented dynamic image dimension loading.
        - Enabled PhotoSwipe navigation arrows (`arrowPrev: true`, `arrowNext: true`).
        - Registered a custom PhotoSwipe UI element for displaying image captions at the bottom, dynamically updating content on slide changes.
    - Re-applied modifications to `src/layouts/Layout.astro`:
        - Ensured `ImageCarousel` was imported in frontmatter.
        - Ensured `<ImageCarousel bindTo=".custom-md img, #post-cover img" client:only="svelte" />` was present in the template.
        - Ensured the legacy `PhotoSwipeLightbox` initialization script was removed.

    (Note: Several `replace` operations reported no changes were made because the target content was already in the desired state from previous successful modifications.)