var $ = require('jquery');
var JSON = require('JSON2');

var getFeed = function(username) {

	var dfd = $.Deferred();

	var requestHTML = $.ajax({
		type: "GET",
		url: 'http://hubski.com/feed?id=' + username,
		datatype: 'html',
		success: function(data) {
			var feedJSON = parseFeedJSON(data);
			dfd.resolve(JSON.stringify(feedJSON));
		}
	});

	return dfd.promise();
}

exports.getFeed = getFeed;

var parseFeedJSON = function(html) {
	var baseURL = 'http://hubski.com/';
	// Setup our posts array which will contain all of the post objects
	console.log('In parseFeedJSON');
	var posts = [];
	// Get the first node in the grid
	
	for(var node = $('#grid > #unit:first'); node.is('div.box'); node = node.next()) {
		// Create an empty post object
		var post = {};

		var title = node.find('.feedtitle > a').html();
		console.log('Title: ' + title)
		var link = node.find('.feedtitle > a').attr('href');

		/* 
		 * You can check to see if this is a upvote or downvote
		 * by looking for the &dir= property
		 */
		var voteLink = post.find('.plusminus > a').attr('href');
		var topCommentor = node.find('.topcommentor > a').html();
		var topCommentorLink = baseURL + node.find('.topcommentor > a').attr('href');
		var commentsLink = baseURL + node.find('.feedcombub > a').attr('href');	
		

		/* 
		 * The method to get the number of comments is to get the
		 * raw html of the parent <a> and remove the img tag and
		 * any whitespace.
		 */

		var numOfComments = node.find('.feedcombub > a').html();
		var num = $.trim(removeTagFromString(numOfComments,'img'));

		var byName = node.find('.feedsubtitle > a').html();
		var by = $.trim(removeTagFromString(byName,'font'));

		/*
		var tags = node.find('.usertrigger > a');
		for( tag in tags) {
			var tagName = $.trim(removeTagFromString(tag.html(),'font'));
			var tagLink = baseURL + tag.attr('href');

			post.push({''})
		}
		*/

		post = {'title': title, 'link': link, 'voteUp': voteUp, 'topCommentor': topCommentor, 'topCommentorLink': topCommentorLink, 'commentsLink': commentsLink, 'numOfComments': $numOfComments, 'by': by};

		posts.push(post);
	}
	var feed = {"posts": posts};

	return feed;
}

exports.parseFeedJSON = parseFeedJSON;

function removeTagFromString(string, tag) {
	return $(string).not(tag);
}