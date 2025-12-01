# Project Architecture Analysis

**Project Name:** Fuwari (Astro Blog Theme)
**Framework:** Astro
**Language:** TypeScript
**UI Library:** Svelte
**Styling:** Tailwind CSS

## 1. High-Level Architecture

This project is built using **Astro**, utilizing its Static Site Generation (SSG) capabilities to deliver high-performance, content-focused websites. The core architectural pattern is the **Islands Architecture**.

*   **Static by Default:** The majority of the application (layouts, content pages, lists) is rendered as static HTML at build time. This ensures fast initial load times and excellent SEO.
*   **Islands Architecture:** Interactive elements (like the Search bar, Theme toggle, and Display settings) are built as "Islands" using **Svelte**. These components are hydrated on the client-side only when needed, keeping the main thread free.
*   **Client-Side Routing (SPA Feel):** While it is a static site, it uses **Swup** to intercept link clicks and update the content dynamically without a full page reload. This provides the smooth transition experience of a Single Page Application (SPA).

## 2. Key Components & Technologies

### 2.1 Core Frameworks
*   **Astro:** The meta-framework orchestrating the build. It handles routing, SSG, and component integration.
*   **Svelte:** Chosen for interactive components (`.svelte` files). Svelte is ideal here because it compiles to small, efficient vanilla JS, fitting well with Astro's performance goals.
*   **Tailwind CSS:** Used for utility-first styling. It's integrated via `@astrojs/tailwind` and allows for rapid UI development with consistency.

### 2.2 Content Management
*   **Astro Content Collections:** Content is stored in `src/content/`. The schema is strictly defined in `src/content/config.ts` using **Zod**, ensuring type safety for all markdown frontmatter.
*   **Markdown/MDX:** The primary format for posts and pages. The project includes a robust pipeline of Remark and Rehype plugins (e.g., `remark-reading-time`, `rehype-component-github-card`) to enhance content rendering.

### 2.3 Search
*   **Pagefind:** A static search library. It indexes the built HTML files and provides a fast, client-side search experience without needing a backend server.

### 2.4 Navigation & Transitions
*   **Swup:** Handles client-side navigation. It updates the DOM and manages CSS transitions between pages.
*   **PhotoSwipe:** Integrated for an image lightbox experience.

## 3. Key Directory Structure

| Directory | Role |
| :--- | :--- |
| `src/content/` | **Data Layer.** Contains Markdown files (`posts`, `projects`) and `config.ts` (schema definitions). |
| `src/pages/` | **Routing.** File-based routing. `[...page].astro` handles pagination for the blog index. `[...slug].astro` renders individual posts. |
| `src/layouts/` | **Templates.** `Layout.astro` is the main app shell, containing the `<head>`, global scripts (Swup, Theme), and the main `<slot />`. |
| `src/components/` | **UI Library.** Contains both `.astro` (static) and `.svelte` (interactive) components. |
| `src/config.ts` | **Configuration.** A central file for global site settings (title, description, menu items), making the theme easy to configure. |
| `src/utils/` | **Helpers.** Utility functions for date formatting, content filtering, and URL handling. |

## 4. Component Interaction Diagram

```mermaid
graph TD
    User[User Browser]
    
    subgraph "Server-Side (Build Time)"
        Astro[Astro Build Engine]
        Content[src/content/*.md]
        Config[src/config.ts]
        Pages[src/pages/*]
        
        Content -->|Schema Validation| Astro
        Config -->|Site Settings| Astro
        Pages -->|Route Generation| Astro
    end

    subgraph "Client-Side (Runtime)"
        Layout[Layout.astro Shell]
        Swup[Swup (Navigation)]
        
        subgraph "Islands (Hydrated)"
            Search[Search.svelte]
            Theme[LightDarkSwitch.svelte]
            Settings[DisplaySettings.svelte]
        end
        
        Pagefind[Pagefind Search Index]
    end

    Astro -->|Generates| Layout
    User -->|Requests| Layout
    Layout -->|Loads| Swup
    Layout -->|Hydrates| Search
    Layout -->|Hydrates| Theme
    
    Search -->|Queries| Pagefind
    Swup -->|Intercepts Clicks| User
```

## 5. Benefits of this Architecture

1.  **Performance:** Zero-JS default means the site loads instantly. JavaScript is only sent for the specific components that need it.
2.  **Type Safety:** The combination of TypeScript and Zod-validated Content Collections prevents runtime errors and missing data in templates.
3.  **Developer Experience:** The separation of concerns (Content vs. Logic vs. Presentation) is clear. Adding a new post is just adding a Markdown file.
4.  **Scalability:** The static build process scales well with content. Pagefind ensures search remains fast even with hundreds of posts.
