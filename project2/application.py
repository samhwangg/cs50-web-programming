import os
import json

from flask import Flask, request, render_template, session, jsonify
from flask_session import Session
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

channelList = ["List", "Of", "Channel", "Names"]

@app.route("/", methods = ["GET", "POST"])
def index():
	return render_template("index.html", channelList=channelList)

@app.route("/addchannel", methods = ["POST"])
def addChannel():
	# Get data we created with "FormData()"
	newChannelName = request.form.get("newChannelInput")
	channelList.append(newChannelName)
	return json.dumps(channelList)

