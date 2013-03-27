var hubski = require('./hubski');

console.log('Getting feed');
var feedHTML;

hubski.getFeed('forwardslash').done(function(data) {
	feedHTML = data;
	console.log('Returned data: ' + feedHTML);
});
console.log('Returned data: ' + feedHTML);