const repo = "Elchedli/Gaiamundi";
const fetchRepo = await fetch("https://api.github.com/repos/" + repo, {
	referrerPolicy: "no-referrer",
}).then((response) => response.json());
const fetchCommits = await fetch(
	"https://api.github.com/repos/" +
		repo +
		"/commits?sha=main&per_page=1&page=1",
	{ referrerPolicy: "no-referrer" },
)
	.then((response) => {
		if (!response.ok) return 0;
		const link = response.headers.get("link");
		if (link) {
			const match = link.match(/page=([0-9]+)>; rel="last"/);
			if (match) return Number.parseInt(match[1]);
		}
		return response
			.json()
			.then((d) => (Array.isArray(d) ? d.length : 0))
			.catch(() => 0);
	})
	.catch(() => 0);
const fetchContributors = await fetch(
	"https://api.github.com/repos/" + repo + "/contributors?per_page=1&anon=true",
	{ referrerPolicy: "no-referrer" },
)
	.then((response) => {
		if (!response.ok) return 0;
		const link = response.headers.get("link");
		if (link) {
			const match = link.match(/page=([0-9]+)>; rel="last"/);
			if (match) return Number.parseInt(match[1]);
		}
		return response
			.json()
			.then((d) => (Array.isArray(d) ? d.length : 0))
			.catch(() => 0);
	})
	.catch(() => 0);
Promise.all([fetchRepo, fetchCommits, fetchContributors]).then(
	console.log(fetchRepo, fetchCommits, fetchContributors),
);
