<script lang="ts">
    import Icon from "@iconify/svelte";

    interface Props {
        images: { src: string; alt: string }[];
    }

    let { images }: Props = $props();

    let currentIndex = $state(0);

    function next() {
        currentIndex = (currentIndex + 1) % images.length;
    }

    function prev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
    }
</script>

<div class="not-prose relative w-full overflow-hidden rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
    <!-- Image container -->
    <div class="relative aspect-video w-full">
        {#each images as image, i}
            <div
                class="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
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
    </div>

    <!-- Controls -->
    {#if images.length > 1}
        <button
            class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
            onclick={prev}
            aria-label="Previous image"
        >
            <Icon icon="fa6-solid:chevron-left" class="text-xl" />
        </button>
        <button
            class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
            onclick={next}
            aria-label="Next image"
        >
            <Icon icon="fa6-solid:chevron-right" class="text-xl" />
        </button>
    {/if}

    <!-- Caption -->
    {#if images[currentIndex]?.alt}
        <div class="absolute bottom-0 left-0 right-0 bg-black/60 p-3 text-center text-sm text-white backdrop-blur-sm">
            {images[currentIndex].alt}
        </div>
    {/if}

    <!-- Indicators -->
    {#if images.length > 1}
        <div class="absolute bottom-12 left-0 right-0 flex justify-center gap-2">
            {#each images as _, i}
                <button
                    class="h-2 w-2 rounded-full transition-colors {i === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'}"
                    onclick={() => (currentIndex = i)}
                    aria-label={`Go to slide ${i + 1}`}
                ></button>
            {/each}
        </div>
    {/if}
</div>
