var restify = require('restify');
var hubski = require('./hubski.js');

function respond(req, res, next) {
	//res.send('User ' + req.params.username);
	res.send(hubski.getFeed(req.params.username));
}

var server = restify.createServer();
server.pre(restify.pre.userAgentConnection());
server.get('/feed/:username', respond);
server.head('/feed/:username', respond);

server.listen(8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});