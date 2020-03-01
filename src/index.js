require("dotenv").config();

const express = require("express");
const fetch = require("node-fetch");

const app = express();

// Parse URLEncoded from Slack
app.use(express.urlencoded({ extended: false }));

app.post("/action", (req, res) => {
	// get the text that the user submitted with the feedback
	const { text, response_url } = req.body;

	if (text) {
		const resObject = {
			text: text
		};

		// send the feedback back to the channel via post
		fetch(response_url, {
			method: "post",
			body: JSON.stringify(resObject),
			headers: { "Content-Type": "application/json" }
		})
			.then(feedbackRes => {
				if (feedbackRes.ok) {
					res.status(200).send({ text: "Feedback has been sent!" });
				}
			})
			.catch(err => res.status(404).end());
	} else {
		res.status(404).end();
	}
});

// start the server
const server = app.listen(process.env.PORT || 5000, () => {
	console.log(
		"Express server listening on port %d in %s mode",
		server.address().port,
		app.settings.env
	);
});

module.exports = router;
// // Routes
// var router = Router();
// config.routes.forEach(route => {
// 	// Ignore wildcard rules
// 	if (route.dest.includes("$")) return;

// 	var path = "." + route.dest;
// 	const code = require(path);
// 	router.all(route.src, code);
// });

// // Static files
// const www = serve("./public");

// // Start server
// var server = http.createServer(function(req, res) {
// 	// Serve routes first then fallback to static files
// 	router(req, res, function() {
// 		www(req, res, done(req, res));
// 	});
// });
// server.listen(8080);
