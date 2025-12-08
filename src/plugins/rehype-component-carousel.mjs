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
	const images = [];

	// Visit all nodes in children to find 'img' elements
	const visitChildren = (nodes) => {
		if (!nodes) return;
		for (const node of nodes) {
			if (node.tagName === "img") {
				images.push({
					src: node.properties.src,
					alt: node.properties.alt || "",
				});
			}
			if (node.children) {
				visitChildren(node.children);
			}
		}
	};

	visitChildren(children);

	if (images.length === 0) {
		return h("div", { class: "hidden" }, "No images found in carousel.");
	}

	return h("div", {
		class: "carousel-component",
		"data-images": JSON.stringify(images),
		style: "display: contents;", // Use contents so the Svelte component can control layout
	});
}
