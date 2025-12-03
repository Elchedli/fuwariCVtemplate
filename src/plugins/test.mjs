const repo = "Elchedli/Gaiamundi";
const fetchRepo = await fetch("https://api.github.com/repos/" + repo, {
	referrerPolicy: "no-referrer",
}).then((response) => response.json());
// const fetchCommits = await fetch(
// 	"https://api.github.com/repos/" +
// 		repo +
// 		"/commits?sha=main&per_page=1&page=1",
// 	{ referrerPolicy: "no-referrer" },
// );

// console.log(fetchRepo);

const fetchCommits = fetch(
	"https://api.github.com/repos/" +
		repo +
		"/commits?sha=main&per_page=1&page=1",
	{ referrerPolicy: "no-referrer" },
)
	.then((response) => {
		if (!response.ok) return 0;
		const link = response.headers.get("link");
		console.log(link);

		if (link) {
			const match = link.match(/page=([0-9]+)>; rel="last"/);
			console.log(match[1]);
			if (match) return Number.parseInt(match[1]);
		}
		response
			.json()
			.then((d) => (Array.isArray(d) ? d.length : 0))
			// .then((d) => console.log(d))
			.catch(() => 0);
	})
	.catch(() => 0);
