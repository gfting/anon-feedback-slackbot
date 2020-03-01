const bodyParser = require("body-parser");

if (process.env.NODE_ENV !== "production") require("dotenv").config();
const fetch = require("node-fetch");

module.exports = async (req, res) => {
	let urlencodedParser = bodyParser.urlencoded({ extended: false });

	const adventData = await (
		await fetch(process.env.ADVENT_URL, {
			method: "GET",
			headers: {
				Cookie: `session=${process.env.ADVENT_COOKIE}`
			}
		})
	).json();

	const startTime = 1575176400 * 1000;
	const totalPossibleStars = 2 * Math.ceil((Date.now() - startTime) / 8.64e7);

	const out = Object.values(adventData.members)
		.sort((a, b) => -a.local_score + b.local_score)
		.map(
			({ name, local_score, stars }, idx) =>
				`${idx + 1}. ${name} - *${local_score}*[${stars}]`
		)
		.join("\n");

	res.end(
		JSON.stringify({
			response_type: "in_channel",
			text: `\n*Here's the current scoreboard:*\n(There are ${totalPossibleStars} available stars)\n\n${out}`
		})
	);
};
