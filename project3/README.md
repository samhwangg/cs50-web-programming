# Project 3 - Bear Canyon Pizza

Web Programming with Python and JavaScript

## Requirements
* __Menu__: Your web application should support all of the available menu items for [Bear Canyon Pizza](http://bearcanyonpizza.com/ "Bear Canyon Pizza Website"). It’s up to you, based on analyzing the menu and the various types of possible ordered items (small vs. large, toppings, additions, etc.) to decide how to construct your models to best represent the information. Add your models to orders/models.py, make the necessary migration files, and apply those migrations.
* __Adding Items__: Using Django Admin, site administrators (restaurant owners) should be able to add, update, and remove items on the menu. Add all of the items from the Bear Canyon's menu into your database using either the Admin UI or by running Python commands in Django’s shell.
* __Registration, Login, Logout__: Site users (customers) should be able to register for your web application with a username, password, first name, last name, and email address. Customers should then be able to log in and log out of your website.
* __Shopping Cart__: Once logged in, users should see a representation of the restaurant’s menu, where they can add items (along with toppings or extras, if appropriate) to their virtual “shopping cart.” The contents of the shopping should be saved even if a user closes the window, or logs out and logs back in again.
* __Placing an Order__: Once there is at least one item in a user’s shopping cart, they should be able to place an order, whereby the user is asked to confirm the items in the shopping cart, and the total (no need to worry about tax!) before placing an order.
* __Viewing Orders__: Site administrators should have access to a page where they can view any orders that have already been placed.
* __Personal Touch__: Add at least one additional feature of your choosing to the web application. Possibilities include: allowing site administrators to mark orders as complete and allowing users to see the status of their pending or completed orders, integrating with the Stripe API to allow users to actually use a credit card to make a purchase during checkout, or supporting sending users a confirmation email once their purchase is complete. If you need to use any credentials (like passwords or API credentials) for your personal touch, be sure not to store any credentials in your source code, better to use environment variables!
* In ```README.md```, include a short writeup describing your project, what’s contained in each file you created or modified, and (optionally) any other additional information the staff should know about your project. Also, include a description of your personal touch and what you chose to add to the project.
If you’ve added any Python packages that need to be installed in order to run your web application, be sure to add them to ```requirements.txt```!