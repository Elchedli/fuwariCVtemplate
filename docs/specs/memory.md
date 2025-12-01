# Project Memory & Quick Reference

## Key Components & logic

### Layout & Configuration
*   **Global Config:** `src/config.ts` controls site-wide settings (title, language, banner, navbar links, profile info).
*   **Base Layout:** `src/layouts/Layout.astro` handles the HTML shell, global CSS, and theme logic. It uses **Swup** for SPA-like transitions.
*   **Grid System:** `src/layouts/MainGridLayout.astro` defines the standard page structure (Navbar, Banner, Sidebar, Main Content, Footer).

### Content Management
*   **Collections:** Content is stored in `src/content/` (e.g., `posts`, `projects`).
*   **Fetching:** `src/utils/content-utils.ts` contains the logic to fetch, filter (drafts), and sort these collections.
*   **Rendering:**
    *   `src/components/PostCard.astro`: Displays a summary of a post.
    *   `src/components/PostPage.astro`: Renders a list of `PostCard`s.

### UI/UX Features
*   **Search:** `src/components/Search.svelte` uses **Pagefind** for static search. It has a fallback mock search for dev mode since Pagefind runs on build.
*   **Theming:** Theme (light/dark) and hue settings are managed in `src/layouts/Layout.astro` and `src/utils/setting-utils.ts`.
*   **Sidebar:** `src/components/widget/SideBar.astro` aggregates the Profile, Categories, and Tags widgets.
*   **Navbar:** `src/components/Navbar.astro` includes navigation links and the search/theme toggles.

### Important Libraries
*   **Astro:** Core framework.
*   **Svelte:** Used for interactive components (Search, DisplaySettings).
*   **Tailwind CSS:** Styling.
*   **Swup:** Page transitions.
*   **OverlayScrollbars:** Custom scrollbars.
*   **PhotoSwipe:** Image lightbox.
*   **Pagefind:** Static search engine.

## Common Tasks
*   **Adding a Menu Link:** Update `navBarConfig` in `src/config.ts`.
*   **Changing Profile Info:** Update `profileConfig` in `src/config.ts`.
*   **Modifying Search Logic:** Check `src/components/Search.svelte`.
*   **Adjusting Layout:** Edit `src/layouts/MainGridLayout.astro`.
