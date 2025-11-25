# How Astro Loads Markdown Files

Astro processes markdown files during its build process, transforming them into HTML through a sophisticated pipeline. Here's how it works in this project, based on the `astro.config.mjs` configuration:

1.  **Markdown Processing:** Astro utilizes a set of `remarkPlugins` to process the raw markdown. These plugins add various functionalities, such as calculating reading time, supporting math equations, and wrapping content in sections. The following remark plugins are configured:
    *   `remarkMath`
    *   `remarkReadingTime`
    *   `remarkExcerpt`
    *   `remarkGithubAdmonitionsToDirectives`
    *   `remarkDirective`
    *   `remarkSectionize`
    *   `parseDirectiveNode`

2.  **Expressive Code Integration:** The `astro-expressive-code` integration is crucial for the advanced rendering of code blocks. It provides:
    *   Syntax highlighting
    *   Line numbers
    *   A copy button
    *   Overall styling and theming of code blocks, as defined in `src/config.ts` and `astro.config.mjs`.

3.  **HTML Transformation:** After the initial markdown processing, the content is passed to `rehypePlugins`. These plugins operate on the HTML representation of your markdown to enhance it further. Key rehype plugins configured include:
    *   `rehypeKatex` (for rendering math)
    *   `rehypeSlug` (for adding IDs to headings)
    *   `rehypeAutolinkHeadings` (for adding anchor links to headings)
    *   `rehypeComponents` (for rendering custom components like admonitions, e.g., `:::note`, `:::tip`, etc., and GitHub cards).

In summary, Astro reads your markdown file and processes it through these defined integrations and plugins to generate the final, styled HTML that is displayed on your website.

While `experiment/example.md` wasn't directly referenced, the `src/pages/posts/[...slug].astro` file uses `getSortedPosts()` from `src/utils/content-utils.ts` to dynamically discover and render content. The `getCollection("posts", ...)` function within `getSortedPosts()` is responsible for finding markdown files within the `src/content/posts` directory and making them available for rendering via the dynamic route.