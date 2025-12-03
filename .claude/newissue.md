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