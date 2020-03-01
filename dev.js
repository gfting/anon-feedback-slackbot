if (process.env.NODE_ENV !== "production") require("dotenv").config();

const http = require("http");
const Router = require("router");
const serve = require("serve-static");
const done = require("finalhandler");
const config = require("./now.json");

// Routes
var router = Router();
config.routes.forEach(route => {
	// Ignore wildcard rules
	if (route.dest.includes("$")) return;

	var path = "." + route.dest;
	const code = require(path);
	router.all(route.src, code);
});

// Static files
const www = serve("./public");

// Start server
var server = http.createServer(function(req, res) {
	// Serve routes first then fallback to static files
	router(req, res, function() {
		www(req, res, done(req, res));
	});
});
server.listen(8080);
