var fs = require('fs');
var url = require('url');
var path = require('path');

function App(config) {

	config = config || {};
	var root = config['root'];

	return function (req, res) {
		var urlObj = url.parse(req.url);
		var filename = path.join(root, urlObj.pathname);
		fs.stat(filename, function (err, stats) {
			if (stats && stats.isFile()) {
				fs.createReadStream(filename).pipe(res);
			} else {
				handleNotFound(req, res);
			}
		});
	}

}

function handleNotFound(req, res) {
	res.writeHead(404);
	res.end('Not Found');
}

module.exports = App;