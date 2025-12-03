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