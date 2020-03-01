const { text } = require("micro");
const { parse } = require("querystring");
const fetch = require("node-fetch");

module.exports = async (req, res) => {
	// get the text that the user submitted with the feedback
	let parsedText, response_url;
	try {
		// gets the application/x-www-form-urlencoded string
		const body = parse(await text(req));
		parsedText = body.text;
		response_url = body.response_url;
	} catch (e) {
		res.status(400);
	}

	if (parsedText) {
		const resObject = {
			text: parsedText,
			response_type: "in_channel"
		};

		// send the feedback back to the channel via post
		fetch(process.env.SLACK_WEBHOOK, {
			method: "post",
			body: JSON.stringify(resObject),
			headers: { "Content-Type": "application/json" }
		}).then(feedbackRes => {
			if (feedbackRes.ok) {
				res.status(200).send({
					text: "Successfully sent your feedback!"
				});
			}
			res.status(400).send();
		});
		// res.status(200).send(resObject);
	} else {
		res.status(404).send({
			error: "There was either now text or there was no response url."
		});
	}
};
