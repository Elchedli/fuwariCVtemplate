/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * Creates a Carousel component.
 *
 * @param {Object} properties - The properties of the component.
 * @param {import('mdast').RootContent[]} children - The children elements of the component.
 * @returns {import('mdast').Parent} The created Carousel component.
 */
export function CarouselComponent(properties, children) {
	if (!Array.isArray(children) || children.length === 0)
		return h("div", { class: "hidden" }, "Invalid carousel directive.");

	const images = [];

	const visit = (node) => {
		if (node.type === "element" && node.tagName === "img") {
			images.push({
				src: node.properties.src,
				alt: node.properties.alt || "",
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
			"Carousel must contain at least one image.",
		);
	}

	const imagesJson = JSON.stringify(images);

	return h(
		"div",
		{
			class: "carousel-component",
			"data-images": imagesJson,
            // Basic placeholder styling
            style: "width: 100%; aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; background-color: rgba(128,128,128,0.1); border-radius: 0.75rem;"
		},
		[h("div", { class: "carousel-loading" }, "Loading Carousel...")],
	);
}
