var restify = require('restify');
var hubski = require('./hubski.js');

function respond(req, res, next) {
	hubski.getFeed(req.params.username).done(function(data) {
        res.send(data);
    });

}

var server = restify.createServer();
server.pre(restify.pre.userAgentConnection());
server.get('/feed/:username', respond);
server.head('/feed/:username', respond);

server.listen(5000, function() {
	console.log('%s listening at %s', server.name, server.url);
});