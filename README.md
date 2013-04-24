hubski-restify
==============

hubski-restify is a RESTful API for [Hubski](www.hubski.com) loosedly based off of [Baltoli's API spec](github.com/Baltoli/hubski-api-spec). Node.js is used for dependancy management and simplified deployment.

## Endpoints

All endpoints are relative to the server the API is run on. For example, if you run the server locally the base address would be `http://localhost:5000`

### Feeds

GET /feed/user/<username>

This returns a JSON object with a `"posts"` field which contains an array of posts which make up the userfeed. Each post has the following data.

Field|Type|Description
-----|----|-----------
Title | string | Title of the post
Link|string|URL of the post which either points to an external URL or a hubski post id. Hubski post links will be in the form of `pub?id=<id>`
Domain| string | Domain name of the link for external links: `[example.com]` <br> Type of post for hubski links: `[text]/[video]/[auduo]`
DomainLink | string | Link to the list of posts for that domain or hubski post type
VoteLink | string | Link to vote on a post
TopCommentor| string | Username of the person with the top comment on the post
TopCommentorLink| string | Link to the top comment on the post
CommentsLink | string | Link to the full comments for the post. The same as the `Link` field for hubski posts.
NumberOfComments | string | Number of comments on the post
Tags | string array | The tags for the post; possible empty
Author | string | The username of who posted the post
