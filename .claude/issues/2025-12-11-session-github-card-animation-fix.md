### 2025-12-11T$(Get-Date -Format HH:mm:ss) Prompt Processing
**Prompt:** : Investigate component `@rehype-component-github-card.mjs` lifecycle. Ensure animation resources are fully deallocated on unmount. Persistent animation indicates stale event listeners or un-cleaned animation frames.
**Understood:** : The user observed persistent animation in the `@rehype-component-github-card.mjs` component. The investigation revealed that the animation is CSS-driven and persists due to the `fetch-waiting` class not being removed on API call failure.
**Resolved:** : Identified the root cause: The `.catch()` block in the inline script of `src/plugins/rehype-component-github-card.mjs` was not removing the `fetch-waiting` class.`n  - Modified `src/plugins/rehype-component-github-card.mjs` to include `c?.classList.remove("fetch-waiting");` within the `.catch()` block.

### 2025-12-11T$(Get-Date -Format HH:mm:ss) Prompt Processing
**Prompt:** : "not fixed"
**Understood:** The user reported the issue persists. Re-evaluation suggests the "persistent animation" is likely caused by variable name collisions (e.g., `const repo`) in the inline script when multiple GitHub cards are present on the same page. This causes the script to crash immediately for subsequent cards, leaving them in the "waiting" state forever.
**Resolved:** : Wrapped the entire inline script content within a block (`{ ... }`) in `src/plugins/rehype-component-github-card.mjs`.This ensures variables like `repo`, `fetchRepo`, etc., are block-scoped, preventing collisions and ensuring all cards load and animate correctly.

### 2025-12-11 Prompt Processing
- **Prompt:** Investigate `rehype-component-github-card.mjs` lifecycle. Ensure animation resources are fully deallocated on unmount.
- **Understood:** Analyzed the component and found two issues: 1) Inline scripts injected into the global scope caused `SyntaxError` (variable collision) when multiple cards were present, causing the loading animation to run forever. 2) The error handler did not remove the `fetch-waiting` class, also causing persistent animation on fetch failure.
- **Resolved:**
  - Refactored the injected script in `src/plugins/rehype-component-github-card.mjs` to be wrapped in an IIFE `(() => { ... })();` to ensure scope isolation.
  - Added `cardEl.classList.remove("fetch-waiting")` to the `catch` block to ensure the animation stops on error.
  - Added null checks for all `getElementById` calls to prevent errors during navigation/unmount.