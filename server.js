var restify = require('restify');
var hubski = require('./hubski.js');

function feed(req, res, next) {
	hubski.getFeed(req.params.username).done(function(data) {
        res.send(data);
    });
}

function post(req, res, next) {
    hubski.getPost(req.params.id).done(function(data) {
        res.send(data);
    });
}

function followers(req, res, next) {
	hubski.getFollowers(req.params.username).done(function(data) {
		res.send(data);
	});
}

function follows(req, res, next) {
	hubski.getFollows(req.params.username).done(function(data) {
		res.send(data);
	});
}

function tags(req, res, next) {
	hubski.getFollowedTags(req.params.username).done(function(data) {
		res.send(data);
	});
}

var server = restify.createServer();
server.pre(restify.pre.userAgentConnection());
server.get('/feed/user/:username', feed);
server.get('/post/:id', post);
server.get('/followers/:username', followers);
server.get('/follows/:username', follows);
server.get('/tags/:username', tags);

var port = process.env.PORT || 5000
server.listen(port, function() {
	console.log('%s listening at %s', server.name, server.url);
});