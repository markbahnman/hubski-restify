var hubski = require('./hubski');

console.log('Getting feed');
var feedHTML;

hubski.getFeed('forwardslash').done(function(data) {
	feedJSON = data;
	console.log('Returned data: ' + feedJSON);
});