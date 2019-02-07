# CS50 Project Writeups

Summary and screenshots of all projects from the CS50W course.

## Project 1 - Bootleg Goodreads
Project 1's goal was to build a book review website where users are able to create an account, log in, search books, and write reviews on said books. This project allowed me to learn the basics of web development including how to use Flask, how to make database calls, and how to make and call APIs. 

* __[application.py](../project1/application.py)__: Flask code to handle the backend code for the website. ```application.py``` handles all SQL calls, API calls to Goodreads.com, and any server side operations. Also has an API when making a ```GET``` request to ```/api/<isbn>``` where ```<isbn>``` is a book's ISBN. If ISBN is valid, the API returns the title, author, year, isbn, and the local review count and average score in the website.
* __[layout.html](../project1/templates/layout.html)__: Jinja2's template inheritance for all other webpages inherit from the format of ```layout.html```. 
* __[index.html](../project1/templates/index.html)__: Home page for Bootleg Goodreads. Displays the username if logged in and links to search, log in, or register.
* __[login.html](../project1/templates/login.html)__: Simple form to log in the user. Makes a SQL call to make sure the username and password exist and is a valid user.
* __[register.html](../project1/templates/register.html)__: Simple form to register a new user. Writes to the database once it is verified that the username is unique and the two password entries match.
* __[search.html](../project1/templates/search.html)__: A list view of all possible matches when a user searches for a title, author, or ISBN of a book. Makes a simple SQL query call to display the results.
* __[bookPage.html](../project1/templates/bookPage.html)__: An overview of a book including the title, author, Goodreads review count & average score, and an entry to write your own review.
* __[styles](../project1/static/styles/)__: CSS code to style the book page. Primarily used to display the stars for the rating feature.
* __[js](../project1/static/js/)__: Simple JavaScript code to prevent the user from submitting any empty forms.

![Project 1 bookPage.html Screenshot](images/project1.png?raw=true)

## Project 2 - Flack
Project 2's goal was to build a single page messenger application similar to Slack. Users are able to create a username, create different channels, and send messages all without reloading the webpage. This project allowed me to get familiar with JavaScript and introduced me to web sockets.

* __[application.py](../project2/application.py)__: Flask code to handle the loading of the single page application. Also handles the AJAX POST requests when loading messages and web sockets for emitting a change to all other users.
* __[index.html](../project2/templates/index.html)__: Home page for Flack. Sidebar contains login/username display, channel list, and a button for an add channel modal. The body is the list view of incoming and outgoing messsges with an input field to type messages. Just below is a typing indicator to see if anyone is typing at that moment.
* __[index.css](../project2/static/styles/index.css)__: CSS code to style Flack.
* __[index.js](../project2/static/js/index.js)__: JavaScript code to handle all the client side code including processing forms, making AJAX requests, emitting web sockets, and dynamically changing the HTML/CSS layout when new channels/messages appear.

![Project 2 index.html Screenshot](images/project2.png?raw=true)
