/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * Creates a GitLab Card component.
 *
 * @param {Object} properties - The properties of the component.
 * @param {string} properties.repo - The GitLab repository in the format "owner/repo".
 * @param {import('mdast').RootContent[]} children - The children elements of the component.
 * @returns {import('mdast').Parent} The created GitLab Card component.
 */
export function GitlabCardComponent(properties, children) {
	if (Array.isArray(children) && children.length !== 0)
		return h("div", { class: "hidden" }, [
			'Invalid directive. ("gitlab" directive must be leaf type "::gitlab{repo="owner/repo"}")',
		]);

	if (!properties.repo || !properties.repo.includes("/"))
		return h(
			"div",
			{ class: "hidden" },
			'Invalid repository. ("repo" attributte must be in the format "owner/repo")',
		);

	const repo = properties.repo;
	const cardUuid = `GL${Math.random().toString(36).slice(-6)}`;

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
		h("div", { class: "gitlab-logo" }),
	]);

	const nDescription = h(
		`div#${cardUuid}-description`,
		{ class: "gc-description" },
		"Waiting for gitlab.com...",
	);

	// Instead of Stars/Forks, we show Commits/Contributors
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
      const repo = "${repo}";
      const encodedRepo = encodeURIComponent(repo);
      
      // Fetch project details (includes commit_count in statistics)
      const fetchProject = fetch('https://gitlab.com/api/v4/projects/' + encodedRepo + '?statistics=true', { referrerPolicy: "no-referrer" })
        .then(response => response.json());

      // Fetch contributors to get count (using per_page=1 and x-total header if available, or just fallback)
      // Note: GitLab API rate limits might be strict for unauthenticated users, but let's try.
      // We use HEAD request to save bandwidth if possible, or just GET per_page=1
      const fetchContributors = fetch('https://gitlab.com/api/v4/projects/' + encodedRepo + '/repository/contributors?per_page=1&page=1', { referrerPolicy: "no-referrer" })
         .then(response => {
             const total = response.headers.get('x-total');
             return total ? parseInt(total, 10) : 0;
         }).catch(() => 0);

      Promise.all([fetchProject, fetchContributors]).then(([data, contributorsCount]) => {
        document.getElementById('${cardUuid}-description').innerText = data.description?.replace(/:[a-zA-Z0-9_]+:/g, '') || "Description not set";
        
        // Commits
        const commits = data.statistics ? data.statistics.commit_count : 0;
        document.getElementById('${cardUuid}-commits').innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(commits).replaceAll("\u202f", '');
        
        // Contributors
        // If fetchContributors returned 0, it might be an error or actually 0. 
        // If data is populated but contributors is 0, we can display it.
        document.getElementById('${cardUuid}-contributors').innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(contributorsCount).replaceAll("\u202f", '');

        // Avatar
        const avatarEl = document.getElementById('${cardUuid}-avatar');
        if (data.avatar_url) {
            avatarEl.style.backgroundImage = 'url(' + data.avatar_url + ')';
            avatarEl.style.backgroundColor = 'transparent';
        }

        // License
        document.getElementById('${cardUuid}-license').innerText = data.license ? data.license.name : (data.license_url ? "License" : "No License");
        
        document.getElementById('${cardUuid}-card').classList.remove("fetch-waiting");
        console.log("[GITLAB-CARD] Loaded card for ${repo} | ${cardUuid}.")
      }).catch(err => {
        const c = document.getElementById('${cardUuid}-card');
        c?.classList.add("fetch-error");
        console.warn("[GITLAB-CARD] (Error) Loading card for ${repo} | ${cardUuid}.", err)
      })
    `,
	);

	return h(
		`a#${cardUuid}-card`,
		{
			class: "card-gitlab fetch-waiting no-styling",
			href: `https://gitlab.com/${repo}`,
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
