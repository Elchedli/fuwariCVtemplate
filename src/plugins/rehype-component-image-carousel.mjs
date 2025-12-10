/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * Creates an image carousel component.
 *
 * @param {Object} properties - The properties of the component.
 * @param {import('mdast').RootContent[]} children - The children elements of the component.
 * @returns {import('mdast').Parent} The created carousel component.
 */
export function ImageCarouselComponent(_properties, children) {
	const images = [];

	const visit = (node) => {
		if (node.tagName === "img") {
			images.push({
				src: node.properties.src,
				alt: node.properties.alt || "",
				title: node.properties.title || node.properties.alt || "",
			});
		} else if (node.children) {
			node.children.forEach(visit);
		}
	};

	children.forEach(visit);

	if (images.length === 0) {
		return h(
			"div",
			{ class: "hidden" },
			"Carousel directive must contain images.",
		);
	}

	const uniqueId = `carousel-${Math.random().toString(36).substr(2, 9)}`;

	// --- Slides ---
	const slides = images.map((img, index) => {
		return h("div", { class: `carousel-item ${index === 0 ? "active" : ""}` }, [
			h("img", {
				src: img.src,
				alt: img.alt,
				class: "d-block w-100 carousel-img-content",
				loading: "lazy", // Good practice
			}),
			h(
				"div",
				{ class: "carousel-caption d-none d-md-block" },
				[img.title ? h("h5", img.title) : null].filter(Boolean),
			),
		]);
	});

	const inner = h("div", { class: "carousel-inner" }, slides);

	// --- Controls ---
	const prevBtn = h(
		"button",
		{
			class: "carousel-control-prev",
			type: "button",
			"data-bs-target": `#${uniqueId}`,
			"data-bs-slide": "prev",
		},
		[
			h("span", { class: "carousel-control-prev-icon", "aria-hidden": "true" }),
			h("span", { class: "visually-hidden" }, "Previous"),
		],
	);

	const nextBtn = h(
		"button",
		{
			class: "carousel-control-next",
			type: "button",
			"data-bs-target": `#${uniqueId}`,
			"data-bs-slide": "next",
		},
		[
			h("span", { class: "carousel-control-next-icon", "aria-hidden": "true" }),
			h("span", { class: "visually-hidden" }, "Next"),
		],
	);

	// --- Indicators ---
	const indicators = h(
		"div",
		{ class: "carousel-indicators" },
		images.map((_, index) =>
			h("button", {
				type: "button",
				"data-bs-target": `#${uniqueId}`,
				"data-bs-slide-to": String(index),
				class: index === 0 ? "active" : "",
				"aria-current": index === 0 ? "true" : "false",
				"aria-label": `Slide ${index + 1}`,
			}),
		),
	);

	// Root Container
	return h(
		"div",
		{ class: "carousel slide", id: uniqueId, "data-bs-ride": "carousel" },
		[indicators, inner, prevBtn, nextBtn],
	);
}
