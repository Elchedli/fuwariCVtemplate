/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * Creates a GitHub Card component.
 *
 * @param {Object} properties - The properties of the component.
 * @param {string} properties.repo - The GitHub repository in the format "owner/repo".
 * @param {import('mdast').RootContent[]} children - The children elements of the component.
 * @returns {import('mdast').Parent} The created GitHub Card component.
 */
export function GithubCardComponent(properties, children) {
	if (Array.isArray(children) && children.length !== 0)
		return h("div", { class: "hidden" }, [
			'Invalid directive. ("github" directive must be leaf type "::github{repo="owner/repo"}")',
		]);

	if (!properties.repo || !properties.repo.includes("/"))
		return h(
			"div",
			{ class: "hidden" },
			'Invalid repository. ("repo" attributte must be in the format "owner/repo")',
		);

	const repo = properties.repo;
	const cardUuid = `GC${Math.random().toString(36).slice(-6)}`; // Collisions are not important

	const nAvatar = h(`div#${cardUuid}-avatar`, { class: "gc-avatar" });
	const nLanguage = h(
		`span#${cardUuid}-language`,
		{ class: "gc-language" },
		"Waiting...",
	);

	const nTitle = h("div", { class: "gc-titlebar" }, [
		h("div", { class: "gc-titlebar-left" }, [
			h("div", { class: "gc-owner" }, [
				nAvatar,
				h("div", { class: "gc-user" }, repo.split("/")[0]),
			]),
			h("div", { class: "gc-divider" }, "/"),
			h("div", { class: "gc-repo" }, repo.split("/")[1]),
		]),
		h("div", { class: "github-logo" }),
	]);

	const nDescription = h(
		`div#${cardUuid}-description`,
		{ class: "gc-description" },
		"Waiting for api.github.com...",
	);

	const nCommits = h(`div#${cardUuid}-commits`, { class: "gc-commits" }, "0K");
	const nContributors = h(
		`div#${cardUuid}-contributors`,
		{ class: "gc-contributors" },
		"0K",
	);
	const nLicense = h(`div#${cardUuid}-license`, { class: "gc-license" }, "0K");

	const nScript = h(
		`script#${cardUuid}-script`,
		{ type: "text/javascript", defer: true },
		`
      (() => {
		const repo = "${repo}";
      const fetchRepo = fetch('https://api.github.com/repos/' + repo, { referrerPolicy: "no-referrer" }).then(response => response.json());
      const fetchCommits = fetch('https://api.github.com/repos/' + repo + '/commits?sha=main&per_page=1&page=1', { referrerPolicy: "no-referrer" })
        .then(response => {
            if (!response.ok) return 0;
            const link = response.headers.get('link');
            if (link) {
                const match = link.match(/page=([0-9]+)>; rel="last"/);
                if (match) return parseInt(match[1]);
            }
            return response.json().then(d => Array.isArray(d) ? d.length : 0).catch(() => 0);
        }).catch(() => 0);
      const fetchContributors = fetch('https://api.github.com/repos/' + repo + '/contributors?per_page=1&anon=true', { referrerPolicy: "no-referrer" })
        .then(response => {
            if (!response.ok) return 0;
            const link = response.headers.get('link');
            if (link) {
                const match = link.match(/page=([0-9]+)>; rel="last"/);
                if (match) return parseInt(match[1]);
            }
            return response.json().then(d => Array.isArray(d) ? d.length : 0).catch(() => 0);
        }).catch(() => 0);

      Promise.all([fetchRepo, fetchCommits, fetchContributors]).then(([data, commits, contributors]) => {
        document.getElementById('${cardUuid}-description').innerText = data.description?.replace(/:[a-zA-Z0-9_]+:/g, '') || "Description not set";
        document.getElementById('${cardUuid}-language').innerText = data.language;
        document.getElementById('${cardUuid}-commits').innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(commits).replaceAll("\\u202f", '');
        document.getElementById('${cardUuid}-contributors').innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(contributors).replaceAll("\\u202f", '');
        const avatarEl = document.getElementById('${cardUuid}-avatar');
        avatarEl.style.backgroundImage = 'url(' + data.owner.avatar_url + ')';
        avatarEl.style.backgroundColor = 'transparent';
        document.getElementById('${cardUuid}-license').innerText = data.license?.spdx_id || "no-license";
        document.getElementById('${cardUuid}-card').classList.remove("fetch-waiting");
        console.log("[GITHUB-CARD] Loaded card for ${repo} | ${cardUuid}.")
      }).catch(err => {
        const c = document.getElementById('${cardUuid}-card');
		 c?.classList.add("fetch-error");
        console.warn("[GITHUB-CARD] (Error) Loading card for ${repo} | ${cardUuid}.")
      })
    })();
	  `,
	);

	return h(
		`a#${cardUuid}-card`,
		{
			class: "card-github fetch-waiting no-styling",
			href: `https://github.com/${repo}`,
			target: "_blank",
			repo,
		},
		[
			nTitle,
			nDescription,
			h("div", { class: "gc-infobar" }, [
				nCommits,
				nContributors,
				nLicense,
				nLanguage,
			]),
			nScript,
		],
	);
}
