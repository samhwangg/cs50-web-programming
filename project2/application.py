import os
import json

from flask import Flask, request, render_template, session, jsonify
from flask_session import Session
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

chatObject = {
	"channelName":
		[
			{
				"Message":"messagetext11",
				"Username":"usernametext11",
				"Time":"Timetext11"
			},
			{
				"Message":"messagetext12",
				"Username":"usernametext12",
				"Time":"Timetext12"
			}

		]
	}
chatObject["channelName2"] = [{
		"Message":"messagetext21",
		"Username":"usernametext21",
		"Time":"Timetext21"
		}]

chatObject["channelName2"].append({
		"Message":"messagetext22",
		"Username":"usernametext22",
		"Time":"Timetext22"
		})
# create new channel
chatObject["channelName3"] = []
# append new message
chatObject["channelName3"].append({
		"Message":"messagetext31",
		"Username":"usernametext31",
		"Time":"Timetext31"
		})

@app.route("/", methods = ["GET", "POST"])
def index():
	return render_template("index.html", chatObject=chatObject)

@app.route("/addchannel", methods = ["POST"])
def addChannel():
	# Get data from FormData() object
	newChannelName = request.form.get("newChannelInput")

	if newChannelName in chatObject:
		return jsonify({"success": False})

	# Create new channel
	chatObject[newChannelName] = []

	return jsonify({"success": True})

@app.route("/addmessage", methods = ["POST"])
def addMessage():
	# Get data from FormData() object
	channel = request.form.get('channel')
	username = request.form.get('username')
	time = request.form.get('time')
	message = request.form.get('message')

	# Append new message to channel
	chatObject[channel].append({
		"Message":message,
		"Username":username,
		"Time":time
		})

	print(len(chatObject[channel]))
	if(len(chatObject[channel]) > 100):
		chatObject[channel].pop(0)
		return jsonify({"change": True})

	return jsonify({"change": False})


@app.route("/changechannel", methods = ["POST"])
def changeChannel():
	return jsonify(chatObject)








