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
let thumbnailsContainer: HTMLElement | undefined = $state();

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
	currentIndex = 0;
	document.body.style.overflow = "hidden";
}

function closeModal() {
	isOpen = false;
	document.body.style.overflow = "";
}

function next() {
	currentIndex = (currentIndex + 1) % images.length;
	scrollThumbnailIntoView();
}

function prev() {
	currentIndex = (currentIndex - 1 + images.length) % images.length;
	scrollThumbnailIntoView();
}

function goTo(index: number) {
	currentIndex = index;
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
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Initial Inline Image -->
{#if images.length > 0}
    <!-- biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div 
        class="not-prose relative group cursor-pointer overflow-hidden rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"
        onclick={openModal}
        role="button"
        tabindex="0"
    >
        <img 
            src={images[0].src} 
            alt={images[0].alt} 
            class="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <!-- Visual Cue Overlay -->
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <div class="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-black/50 backdrop-blur-sm rounded-full p-3 text-white">
                 <Icon icon="fa6-solid:expand" class="text-xl" />
            </div>
        </div>
        
        {#if images.length > 1}
            <div class="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1 rounded-md">
                +{images.length - 1} more
            </div>
        {/if}
    </div>
{/if}

<!-- Modal -->
{#if isOpen}
    <div use:portal class="fixed inset-0 z-[9999] flex flex-col bg-black/95 backdrop-blur-sm" transition:fade={{ duration: 200 }} role="dialog" aria-modal="true">
        <!-- Close Button -->
        <button 
            class="absolute top-4 right-4 z-50 p-2 text-white/70 hover:text-white transition-colors bg-black/20 hover:bg-black/50 rounded-full" 
            onclick={closeModal}
            aria-label="Close gallery"
        >
            <Icon icon="material-symbols:close-rounded" class="text-3xl" />
        </button>

        <!-- Main Content Area -->
        <!-- biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="flex-1 relative w-full h-full flex items-center justify-center p-4" onclick={(e) => e.target === e.currentTarget && closeModal()}>
            
             <!-- Navigation Buttons -->
            {#if images.length > 1}
                <button 
                    class="absolute left-4 z-40 p-3 text-white/50 hover:text-white transition-all hover:bg-white/10 rounded-full" 
                    onclick={(e) => { e.stopPropagation(); prev(); }}
                >
                    <Icon icon="fa6-solid:chevron-left" class="text-3xl" />
                </button>
                <button 
                    class="absolute right-4 z-40 p-3 text-white/50 hover:text-white transition-all hover:bg-white/10 rounded-full" 
                    onclick={(e) => { e.stopPropagation(); next(); }}
                >
                    <Icon icon="fa6-solid:chevron-right" class="text-3xl" />
                </button>
            {/if}

             <!-- Main Image -->
             <div class="relative max-w-full max-h-full flex items-center justify-center w-full h-full pointer-events-none">
                 {#key currentIndex}
                     <img 
                        src={images[currentIndex].src} 
                        alt={images[currentIndex].alt}
                        class="absolute max-w-full max-h-full object-contain shadow-2xl pointer-events-auto"
                        transition:fade={{ duration: 200 }}
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
