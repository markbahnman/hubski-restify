hubski-restify
==============

hubski-restify is a RESTful API for [Hubski](http://www.hubski.com) loosedly based off of [Baltoli's API spec](Baltoli/hubski-api-spec).

## Usage

To run the server you first need to have [Node.js](http://nodejs.org/) and the [Node Packaged Modules](https://npmjs.org/) installed.

After cloning the repository you can install the dependancy modules with 
```
npm install
```
Then you can run the API server with 
```
node server.js
```

Note: The repo comes with a Procfile which can be used to run the server on [Heroku](https://www.heroku.com/). Because it does not store any data it can be run as a free app. If you want to run it on heroku [deploy it using git](https://devcenter.heroku.com/articles/git) on a new or existing app using the [Heroku Toolbelt](https://toolbelt.herokuapp.com/).

## Endpoints

All endpoints are relative to the server the API is run on. For example, if you run the server locally the base address would be `http://localhost:5000`

### Feeds

`GET /feed/user/<username>`

Returns a JSON object with a `"posts"` field which contains an array of posts which make up the userfeed. Each post has the following data.

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

### Post

`GET /post/<id>`

Returns a JSON object. The id of a post can be seen in the URL a post, e.g. `http://hubski.com/pub?id=<id>`

Field|Type|Description
-----|----|-----------
Title | string | Title of the post
Link|string|URL of the post which either points to an external URL or a hubski post id. Hubski post links will be in the form of `pub?id=<id>`
Text | string | The text of the post if the author included text. This can include HTML tags such as `<p>` and `<br>`
Posted | string | How long ago the post was posted
NumberOfComments | string | Number of comments of the post
Author| string | User who submitted the post
SharedBy | string | User who shared this with you
Tags | string array | The tags for the post; possible empty