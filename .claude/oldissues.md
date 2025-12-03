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