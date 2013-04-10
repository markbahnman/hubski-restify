var $ = require('jquery');

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
var string = 'by <a href="user?id=NotPhil"><font color="#1256be">NotPhil</font></a>&nbsp;·&nbsp;<span style="position:relative;"><span><a href="tag?id=education">#education</a></span></span><span></span>&nbsp;·&nbsp;<span><a href="tag?id=humor">#humor</a></span>&nbsp;·&nbsp;<a href="ctag?id=78934">Δ#</a><br> <span style="font-size:10px;">posted: 12 hours ago&nbsp;·&nbsp;shared by: <a href="sharedby?id=78934" class="ajax cboxElement">7</a></span>';

var tags = getTags(string);
console.log(tags);

