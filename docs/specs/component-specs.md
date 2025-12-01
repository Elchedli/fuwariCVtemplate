# Component Technical Specification

### `src/config.ts`
* **Role:** Defines the global configuration settings for the website, including site metadata, navigation links, profile details, license information, and expressive code themes.
* **Parameters (Inputs):**
    *   None (Exports constant configuration objects directly).
* **Internal Functions:**
    *   None.

### `src/layouts/Layout.astro`
* **Role:** Acts as the root layout component, establishing the HTML structure, head metadata, global styles, and initializing core site behaviors like themes, scrollbars, and page transitions (Swup).
* **Parameters (Inputs):**
    *   `title`: The title of the page.
    *   `banner`: URL of the banner image.
    *   `description`: Description of the page for SEO.
    *   `lang`: Language of the page.
    *   `setOGTypeArticle`: Boolean to set Open Graph type to 'article'.
* **Internal Functions:**
    *   `init()`: Initializes the color theme, hue, custom scrollbars, and banner visibility on page load.
    *   `setup()`: Registers Swup hooks to handle behaviors during page transitions (e.g., banner height adjustment, scrollbar re-initialization).
    *   `scrollFunction()`: Toggles the visibility of UI elements (Back to Top button, TOC, Navbar) based on scroll position.
    *   `createPhotoSwipe()`: Initializes the PhotoSwipe lightbox library for image viewing.

### `src/layouts/MainGridLayout.astro`
* **Role:** structured layout component that organizes the page content into a responsive grid with a navbar, banner, sidebar, main content area, and footer.
* **Parameters (Inputs):**
    *   `title`: Page title passed to the base Layout.
    *   `banner`: Banner image URL passed to the base Layout.
    *   `description`: Page description passed to the base Layout.
    *   `lang`: Page language passed to the base Layout.
    *   `setOGTypeArticle`: Passed to the base Layout.
    *   `headings`: List of markdown headings for the Table of Contents.
* **Internal Functions:**
    *   None.

### `src/components/PostCard.astro`
* **Role:** Renders a summary card for a single post or project, displaying the title, metadata (date, tags), description, and an optional cover image.
* **Parameters (Inputs):**
    *   `entry`: The content collection entry object.
    *   `title`: Title of the post.
    *   `url`: URL to the full post.
    *   `published`: Publication date.
    *   `updated`: Last updated date.
    *   `tags`: Array of tags associated with the post.
    *   `category`: Category of the post.
    *   `image`: URL of the cover image.
    *   `description`: Short description or excerpt.
    *   `draft`: Boolean indicating if the post is a draft.
    *   `style`: Custom CSS styles (used for animation delays).
    *   `contentType`: Type of content (e.g., 'posts', 'projects').
* **Internal Functions:**
    *   None.

### `src/components/widget/Profile.astro`
* **Role:** Displays the author's profile card in the sidebar, including an avatar, name, bio, and social media links.
* **Parameters (Inputs):**
    *   None (Uses `profileConfig` from `src/config.ts`).
* **Internal Functions:**
    *   None.

### `src/components/Navbar.astro`
* **Role:** Renders the top navigation bar containing site links, a search bar, theme toggle, and mobile menu trigger.
* **Parameters (Inputs):**
    *   `class`: Custom CSS classes.
* **Internal Functions:**
    *   `switchTheme()`: Toggles the site's theme between light and dark modes and updates local storage.
    *   `loadButtonScript()`: Attaches click event listeners to the theme switch, display settings, and mobile menu buttons.
    *   `loadPagefind()`: Asynchronously loads and initializes the Pagefind search library.

### `src/utils/content-utils.ts`
* **Role:** Provides utility functions for fetching, filtering, sorting, and processing content collections (posts and projects) and generating metadata lists (tags, categories).
* **Parameters (Inputs):**
    *   None (Exports functions).
* **Internal Functions:**
    *   `getRawSortedPosts()`: Fetches all posts from the 'posts' collection and sorts them by publication date (descending).
    *   `getSortedProjects()`: Fetches all projects from the 'projects' collection and sorts them by publication date.
    *   `getSortedPosts()`: Returns sorted posts with added `nextSlug` and `prevSlug` properties for navigation.
    *   `getSortedPostsList()`: Returns a lightweight list of sorted posts (without body content) for listings.
    *   `getTagList()`: Aggregates all unique tags from posts and counts their occurrences.
    *   `getCategoryList()`: Aggregates all categories from posts and counts their occurrences.

### `src/components/Search.svelte`
* **Role:** Implements the client-side search UI and logic using the Pagefind library, including a search input and a results panel.
* **Parameters (Inputs):**
    *   None.
* **Internal Functions:**
    *   `togglePanel()`: Toggles the open/closed state of the mobile search panel.
    *   `setPanelVisibility()`: Controls the visibility of the search results panel based on input and device type.
    *   `search(keyword, isDesktop)`: Executes a search query using `window.pagefind` (or mock data in dev) and updates the results.
    *   `initializeSearch()`: Sets up the search state, checking for Pagefind availability and handling load events.

### `src/components/PostPage.astro`
* **Role:** Iterates through a paginated list of content entries and renders a `PostCard` component for each one, applying animation delays.
* **Parameters (Inputs):**
    *   `page`: The pagination object containing the current page's data.
    *   `contentType`: The collection name (e.g., 'posts').
* **Internal Functions:**
    *   None.

### `src/components/widget/SideBar.astro`
* **Role:** Assembles the sidebar layout, containing the `Profile` widget and a sticky section with `Categories` and `Tags` widgets.
* **Parameters (Inputs):**
    *   `class`: Custom CSS classes.
    *   `headings`: Headings for the TOC (though TOC is handled separately in MainGridLayout).
* **Internal Functions:**
    *   None.
