<script lang="ts">
    interface Props {
        images: { src: string; alt: string }[];
    }

    let { images }: Props = $props();

    let currentIndex = $state(0);

    function next() {
        if (images.length > 1) {
            currentIndex = (currentIndex + 1) % images.length;
        }
    }
</script>

<!-- 
    Carousel Container 
    - Click to advance
    - Full width/height based on aspect ratio
-->
<div class="not-prose relative w-full overflow-hidden rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 group">
    <!-- Image container -->
    <div 
        class="relative aspect-video w-full cursor-pointer"
        onclick={next}
        onkeydown={(e) => e.key === 'Enter' && next()}
        role="button"
        tabindex="0"
        aria-label="Next slide"
    >
        {#each images as image, i}
            <div
                class="absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out"
                class:opacity-100={i === currentIndex}
                class:opacity-0={i !== currentIndex}
                class:pointer-events-none={i !== currentIndex}
            >
                <img
                    src={image.src}
                    alt={image.alt}
                    class="h-full w-full object-contain"
                />
            </div>
        {/each}

        <!-- Hint overlay (optional, shows on hover to indicate clickability) -->
        {#if images.length > 1}
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none"></div>
        {/if}
    </div>

    <!-- Caption - Strictly at the bottom -->
    {#if images[currentIndex]?.alt}
        <div class="absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-center text-sm font-medium text-white backdrop-blur-md transition-opacity duration-300">
            {images[currentIndex].alt}
        </div>
    {/if}
</div>