import os

from flask import Flask, request, render_template, session
from flask_session import Session
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

@app.route("/", methods = ["GET", "POST"])
def index():
	return render_template("index.html")

