import os

from flask import Flask, session, render_template, request, redirect, url_for
from flask_session import Session
from sqlalchemy import create_engine, exc
from sqlalchemy.orm import scoped_session, sessionmaker

app = Flask(__name__)

# Check for environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Set up database
engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))

@app.route("/", methods = ["GET", "POST"])
def index():
	# TODO: implement a safer logout method
	if request.method == "POST":
		if 'username' in session:
			session.pop('username',None)
	return render_template("index.html")

@app.route("/register", methods = ["GET", "POST"])
def register():
	errorMessage = ""
	if request.method == "POST":
		if request.form.get("password") == request.form.get("password2"):
			# TODO: implement password check in client side as well for quick feedback
			username = request.form.get("username")
			password = request.form.get("password")
			try:
				db.execute("INSERT INTO users (username, password) VALUES (:username, :password)", 
					{"username": username, "password": password})
				db.commit()
				session["username"] = username
				return redirect(url_for('index'))
			except exc.IntegrityError:
				db.rollback()
				errorMessage = "Username already taken"
	return render_template("register.html", errorMessage=errorMessage)

@app.route("/login", methods = ["GET", "POST"])
def login():
	errorMessage = ""
	if 'username' in session:
		return redirect(url_for('index'))
	if request.method == "POST":
		username = request.form.get("username")
		password = request.form.get("password")
		if db.execute("SELECT * FROM users WHERE username = :username AND password = :password", 
			{"username": username, "password": password}).rowcount == 1:
			# existing/correct username is stored in the session
			#TODO: return error if incorrect password
			session["username"] = username
			return redirect(url_for('index'))
		else:
			errorMessage = "Username or password is incorrect"
	return render_template("login.html", errorMessage=errorMessage)

@app.route("/search", methods = ["GET", "POST"])
def search():
	# TODO: make search request appear in URL
	#		submit not clickable if search bar is empty
	#		error paragraph below search bar
	#		search bar in search route w/ current search info
	#		search for partial matches
	#		book url will be ISBN
	searchText = request.form.get("search")
	searchCategory = request.form.get("searchCategory")
	bookInfo = db.execute("SELECT isbn, title, author, year FROM books WHERE " + searchCategory + " = :searchText", 
		{"searchText": searchText})
	return render_template("search.html", searchText=searchText, bookInfo=bookInfo)