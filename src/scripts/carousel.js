function initCarousels() {
	console.log("Carousel: Initializing in-page carousels...");
	const carousels = document.querySelectorAll(".carousel");

	if (carousels.length === 0) {
		console.log("Carousel: No .carousel elements found.");
		return;
	}

	carousels.forEach((carousel, idx) => {
		if (carousel.hasAttribute("data-initialized")) {
			return;
		}

		const inner = carousel.querySelector(".carousel-inner");
		const items = carousel.querySelectorAll(".carousel-item");
		const indicators = carousel.querySelectorAll(".carousel-indicators button");
		const prevBtn = carousel.querySelector(".carousel-control-prev");
		const nextBtn = carousel.querySelector(".carousel-control-next");

		if (!items.length) return;

		let currentIndex = 0;
		const totalSlides = items.length;

		function showSlide(index) {
			let targetIndex = index;
			if (targetIndex < 0) targetIndex = totalSlides - 1;
			if (targetIndex >= totalSlides) targetIndex = 0;

			currentIndex = targetIndex;

			if (inner) inner.style.transform = `translateX(-${currentIndex * 100}%)`;

			indicators.forEach((ind, i) => {
				if (i === currentIndex) {
					ind.classList.add("active");
					ind.setAttribute("aria-current", "true");
				} else {
					ind.classList.remove("active");
					ind.setAttribute("aria-current", "false");
				}
			});
		}

		// --- Controls ---
		if (prevBtn) {
			prevBtn.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation(); // Stop propagation for the button itself
				showSlide(currentIndex - 1);
			});
		}

		if (nextBtn) {
			nextBtn.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				showSlide(currentIndex + 1);
			});
		}

		indicators.forEach((ind, i) => {
			ind.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				showSlide(i);
			});
		});

		// --- Touch Support (Swipe) ---
		let touchStartX = 0;
		let touchEndX = 0;

		carousel.addEventListener(
			"touchstart",
			(e) => {
				touchStartX = e.changedTouches[0].screenX;
			},
			{ passive: true },
		);

		carousel.addEventListener(
			"touchend",
			(e) => {
				touchEndX = e.changedTouches[0].screenX;
				handleSwipe();
			},
			{ passive: true },
		);

		function handleSwipe() {
			const threshold = 50;
			// Only slide if swipe is significant
			if (Math.abs(touchEndX - touchStartX) > threshold) {
				if (touchEndX < touchStartX) {
					showSlide(currentIndex + 1);
				} else {
					showSlide(currentIndex - 1);
				}
			}
		}

		// Mark as initialized
		carousel.setAttribute("data-initialized", "true");
		console.log(`Carousel ${idx}: Initialized.`);
	});
}

// Initial load
document.addEventListener("DOMContentLoaded", initCarousels);

// Swup integration
if (window.swup) {
	window.swup.hooks.on("page:view", initCarousels);
	window.swup.hooks.on("content:replace", initCarousels);
} else {
	document.addEventListener("swup:enable", () => {
		window.swup.hooks.on("page:view", initCarousels);
		window.swup.hooks.on("content:replace", initCarousels);
	});
}
