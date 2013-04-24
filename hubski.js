// Beware traveller, below thar be regex
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
	var JSON = {'Title': title, 'Link': link, 'Text': text, 'Tags': tags, 'Posted': posted, 'Author': author, 'SharedBy': sharedBy, 'NumberOfComments': numOfComments, 'comments': comments};
	return JSON;
}

var getTags= function(tagString) {
	var tags = [];
	var re = new RegExp('<a href="tag\\?id=([a-zA-Z0-9]*)">','g');
	for(var i = 0; i < 2; i++) {
		var tag = re.exec(tagString);
		if(tag != null) {
			tags.push(RegExp.$1);
		}
	}
	return tags;
}

var getComments = function(html) {
	$doc = $(html);
	var comments = [];

	var commentObjList = $('.outercomm');

	for(var i = commentObjList.length - 1; i >= 0; i--) {
		var comm = commentObjList[i];

		var author = getUser(comm.find('span.comhead').html());
	};
	//TODO: Create an array of comments and their relationships
	return comments;
}

var getUser = function(html) {
	var user = null;
	var re = new RegExp('<a href="user\\?id=([a-z0-9\-\_]*)">','i');
	html.match(re);
	user = RegExp.$1;
	return user;
}

var getTime = function(html) {
	$doc = $(html);
	var posted = null;
	//TODO: Parse out the time of the post
	return posted;
}

var getCommentId = function(html) {
	var id = null;
	var re = new RegExp('<a href="pub\\?=([0-9]*)">','i');
	html.match(re);
	id = RegExp.$1;
	return id;
}

var getSaveFnid = function(html) {
	var fnid = null;
	var re = new RegExp('<a href="\/r\\?fnid=([a-z0-9]*)">','i');
	html.match(re);
	fnid = RegExp.$1;
	return fnid;
}

var getBadgeLink = function(html) {
	var fnid = null;
	var re = new RegExp('<a href="\/x\\?fnid=([a-zA-Z0-9]*)">','i');
	html.match(re);
	fnid = RegExp.$1;
	return fnid;
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
		var domainAnchor = node.find('.feedtitlelinks > .titleurl > a');
		var domain = domainAnchor.html();
		var domainLink = domainAnchor.attr('href');
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

		
		var tags = getTags(node.find('.feedsubtitle').html());

		post = {'Title': title, 'Link': link, 'Domain': domain, 'DomainLink': domainLink, 'VoteLink': voteLink, 'TopCommentor': topCommentor, 'TopCommentorLink': topCommentorLink, 'CommentsLink': commentsLink, 'NumberOfComments': num,'Tags': tags, 'Author': by};

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