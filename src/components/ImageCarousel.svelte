<script lang="ts">
import Icon from "@iconify/svelte";
import { tick } from "svelte";
import { fade } from "svelte/transition";

interface Props {
	images: { src: string; alt: string }[];
}

let { images }: Props = $props();

let isOpen = $state(false);
let currentIndex = $state(0);
let inlineIndex = $state(0); // For the inline strip view
let thumbnailsContainer: HTMLElement | undefined = $state();

let zoomScale = $state(1);

// Portal action to move modal to body
function portal(node: HTMLElement) {
	document.body.appendChild(node);
	return {
		destroy() {
			if (node.parentNode) {
				node.parentNode.removeChild(node);
			}
		},
	};
}

function openModal() {
	isOpen = true;
	currentIndex = inlineIndex;
	zoomScale = 1;
	document.body.style.overflow = "hidden";
}

function closeModal() {
	isOpen = false;
	zoomScale = 1;
	document.body.style.overflow = "";
}

function next() {
	currentIndex = (currentIndex + 1) % images.length;
	zoomScale = 1;
	scrollThumbnailIntoView();
}

function prev() {
	currentIndex = (currentIndex - 1 + images.length) % images.length;
	zoomScale = 1;
	scrollThumbnailIntoView();
}

function goTo(index: number) {
	currentIndex = index;
	zoomScale = 1;
	scrollThumbnailIntoView();
}

async function scrollThumbnailIntoView() {
	await tick();
	if (thumbnailsContainer?.children[currentIndex]) {
		const thumbnail = thumbnailsContainer.children[currentIndex] as HTMLElement;
		thumbnail.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "center",
		});
	}
}

function handleKeydown(e: KeyboardEvent) {
	if (!isOpen) return;
	if (e.key === "Escape") closeModal();
	if (e.key === "ArrowRight") next();
	if (e.key === "ArrowLeft") prev();
}

function handleWheel(e: WheelEvent) {
	if (!isOpen) return;
	e.preventDefault();
	const delta = e.deltaY * -0.002;
	const newScale = zoomScale + delta;
	zoomScale = Math.min(Math.max(1, newScale), 5); // Clamp scale between 1 and 5
}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Inline Image Strip -->
{#if images.length > 0}
    <div class="flex flex-col gap-4 w-full items-center my-8 not-prose">
        <!-- Main Display Image -->
        <!-- biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div 
            class="relative w-full overflow-hidden rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 cursor-zoom-in group select-none"
            onclick={openModal}
            role="button"
            tabindex="0"
        >
            <img 
                src={images[inlineIndex].src} 
                alt={images[inlineIndex].alt} 
                class="w-full h-auto object-contain max-h-[70vh] mx-auto transition-transform duration-500 carouselImg"
            />
            <!-- Hover Overlay -->
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div class="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-black/50 backdrop-blur-sm rounded-full p-3 text-white">
                     <Icon icon="fa6-solid:expand" class="text-xl" />
                </div>
            </div>
            
            {#if images.length > 1}
                <div class="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md font-medium">
                    {inlineIndex + 1} / {images.length}
                </div>
            {/if}
        </div>

        <!-- Inline Thumbnails -->
        {#if images.length > 1}
            <div class="flex gap-2 overflow-x-auto w-full max-w-full justify-start md:justify-center scrollbar-hide py-1 px-1">
                {#each images as img, i}
                    <button
                        class="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all cursor-pointer {i === inlineIndex ? 'border-primary ring-2 ring-primary/20 opacity-100 scale-105' : 'border-transparent opacity-50 hover:opacity-100'}"
                        onclick={(e) => { e.stopPropagation(); inlineIndex = i; }}
                        aria-label={`View image ${i + 1}`}
                        type="button" 
                    >
                        <img src={img.src} alt={img.alt} class="h-full w-full object-cover carouselImg" />
                    </button>
                {/each}
            </div>
        {/if}
    </div>
{/if}

<!-- Modal -->
{#if isOpen}
    <div 
        use:portal 
        class="fixed inset-0 z-[9999] flex flex-col bg-black/95 backdrop-blur-sm" 
        transition:fade={{ duration: 200 }} 
        role="dialog" 
        aria-modal="true"
        onwheel={handleWheel}
    >
        <!-- Close Button -->
        <button 
            class="absolute top-4 right-4 z-50 p-2 text-white/70 hover:text-white transition-colors bg-black/20 hover:bg-black/50 rounded-full" 
            onclick={closeModal}
            aria-label="Close gallery"
            type="button"
        >
            <Icon icon="material-symbols:close-rounded" class="text-3xl" />
        </button>

        <!-- Main Content Area -->
        <!-- biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="flex-1 relative w-full h-full flex items-center justify-center p-4 overflow-hidden" onclick={(e) => e.target === e.currentTarget && closeModal()}>
            
             <!-- Navigation Buttons -->
            {#if images.length > 1}
                <button 
                    class="absolute left-4 z-40 p-3 text-white/50 hover:text-white transition-all hover:bg-white/10 rounded-full" 
                    onclick={(e) => { e.stopPropagation(); prev(); }}
                    type="button"
                >
                    <Icon icon="fa6-solid:chevron-left" class="text-3xl" />
                </button>
                <button 
                    class="absolute right-4 z-40 p-3 text-white/50 hover:text-white transition-all hover:bg-white/10 rounded-full" 
                    onclick={(e) => { e.stopPropagation(); next(); }}
                    type="button"
                >
                    <Icon icon="fa6-solid:chevron-right" class="text-3xl" />
                </button>
            {/if}

             <!-- Main Image -->
             <div class="relative flex items-center justify-center w-full h-full pointer-events-none">
                 {#key currentIndex}
                     <img 
                        src={images[currentIndex].src} 
                        alt={images[currentIndex].alt}
                        class="absolute object-contain shadow-2xl pointer-events-auto transition-transform duration-100 ease-out will-change-transform carouselImg"
                        style="transform: scale({zoomScale}); max-width: 100%; max-height: 100%;"
                     />
                 {/key}
             </div>
        </div>

        <!-- Bottom Section: Caption & Thumbnails -->
        <div class="w-full bg-black/80 backdrop-blur-md border-t border-white/10 flex flex-col shrink-0 z-40 pb-safe">
            
            <!-- Caption -->
            <div class="p-4 text-center">
                 {#if images[currentIndex].alt}
                     <p class="text-white/90 font-medium text-lg max-w-4xl mx-auto line-clamp-2">
                         {images[currentIndex].alt}
                     </p>
                 {/if}
                 <p class="text-white/40 text-sm mt-1">
                    {currentIndex + 1} / {images.length}
                 </p>
            </div>

            <!-- Thumbnails -->
            {#if images.length > 1}
                <div 
                    class="flex gap-2 overflow-x-auto px-4 pb-4 justify-start md:justify-center scrollbar-hide w-full" 
                    bind:this={thumbnailsContainer}
                >
                    {#each images as img, i}
                        <button 
                           class="relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 transition-all cursor-pointer {i === currentIndex ? 'border-primary opacity-100 ring-2 ring-primary/20' : 'border-transparent opacity-40 hover:opacity-80'}"
                           onclick={() => goTo(i)}
                           aria-label={`Go to image ${i + 1}`}
                           type="button"
                        >
                            <img src={img.src} alt={img.alt} class="h-full w-full object-cover" loading="lazy" />
                        </button>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
{/if}

<style>
    .pb-safe {
        padding-bottom: env(safe-area-inset-bottom);
    }
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>
