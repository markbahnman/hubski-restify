var $ = require('jquery');

// Constants which may be subject to change with mk's whims
var BASEURL = 'http://hubski.com/';
var FEEDURL = 'feed?id=';
var POSTURL = 'pub?id=';

/*
 * General purpose async GET function. It provide us with
 * most everything we need for this api.
 */
var GET = function(URL, parser) {
	var dfd = $.Deferred();

	var requestHTML = $.ajax({
		type: "GET",
		url: URL,
		datatype: 'html',
		success: function(data) {
			var parsedData = parser(data);
			dfd.resolve(parsedData);
		}
	});
	return dfd.promise();
}

var getPost = function(id) {
	var dfd = $.Deferred();
	GET(BASEURL+POSTURL+id,parsePost).done(function(data) {
		dfd.resolve(data);
	});

	return dfd.promise();
}

exports.getPost = getPost;

var getFeed = function(username) {
	var URL = BASEURL+FEEDURL+username;

	var dfd = $.Deferred();

	GET(URL, parseFeed).done(function(data) {
		dfd.resolve(data);
	});

	return dfd.promise();
}

exports.getFeed = getFeed;

var parsePost = function(html) {
	$doc = $(html);
	var title = $doc.find('title').html();
	var link = $doc.find('span.title > a').attr('href');
	var text = $doc.find('div.pubcontent > div.pubtext').html();
	var tags = getTags($doc.find('div.subtitle').html());
	var sharedBy = $doc.find('div.subtitle > span > a.ajax').html();
	var author = removeTagFromString($doc.find('div.subtitle > a').html(), 'font');
	var posted = getTime(html);
	var numOfComments = removeTagFromString($doc.find('span.combub > a').html(),'img');
	var comments = getComments(html);
	var JSON = {'Title': title, 'Link': link, 'text': text, 'tags': tags, 'Posted': posted, 'Author': author, 'SharedBy': sharedBy, 'NumberOfComments': numOfComments, 'comments': comments};
	return JSON;
}

var getTags = function(tagString) {
	var tags = [];
	//TODO: Use some regex to get the tags
	return tags;
}

var getComments = function(html) {
	$doc = $(html);
	var comments = [];
	//TODO: Create an array of comments and their relationships
	return comments;
}

var getTime = function(html) {
	$doc = $(html);
	var posted = null;
	//TODO: Parse out the time of the post
	return posted;
}
var parseFeed = function(html) {
	var posts = [];
	$doc = $(html);

	// Get the first node in the grid
	for(var node = $doc.find('#grid > #unit:first'); node.is('div.box'); node = node.next()) {
		// Create an empty post object
		var post = {};

		var title = node.find('.feedtitle > a').html();
		var link = node.find('.feedtitle > a').attr('href');

		/* 
		 * You can check to see if this is a upvote or downvote
		 * by looking for the &dir= property
		 */
		var voteLink = node.find('.plusminus > a').attr('href');
		var topCommentor = node.find('.topcommentor > a').html();
		var topCommentorLink = BASEURL + node.find('.topcommentor > a').attr('href');
		var commentsLink = BASEURL + node.find('.feedcombub > a').attr('href');	
		

		/* 
		 * The method to get the number of comments is to get the
		 * raw html of the parent <a> and remove the img tag and
		 * any whitespace.
		 */

		var numOfComments = node.find('.feedcombub > a').html();
		var num = removeTagFromString(numOfComments,'img');

		var byName = node.find('.feedsubtitle > a').html();
		var by = removeTagFromString(byName,'font');

		
		var tag = node.find('.feedsubtitle > span > span > a').html();
		
		/*
		for( tag in tagsHTML) {
			console.log(tag);
			console.log(tag.html());
			var tagName = removeTagFromString(tag,'font');
			var tagLink = baseURL + tag.attr('href');

			tags.push({'tagName': tagName,'tagLink':tagLink});
		}
		*/

		post = {'Title': title, 'Link': link, 'VoteLink': voteLink, 'TopCommentor': topCommentor, 'TopCommentorLink': topCommentorLink, 'CommentsLink': commentsLink, 'NumberOfComments': num,'Tag': tag, 'Author': by};

		posts.push(post);
	}
	var feed = {"posts": posts};

	return feed;
}

exports.parseFeed = parseFeed;

function removeTagFromString(string, tag) {
	var re = new RegExp('<'+tag+'.*/>','g');
	var returnStr = string;
	returnStr = string.replace(re,'');
	returnStr = returnStr.replace('<'+tag+'/>','');
	return returnStr;
}