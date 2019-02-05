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

@app.route("/checkchannel", methods = ["POST"])
def checkChannel():
	# Get data from FormData() object
	newChannelName = request.form.get("newChannelInput")

	# Check collision for new channel name
	if newChannelName in chatObject:
		print("collision")
		return jsonify({"success": False})

	return jsonify({"success": True})

@app.route("/checkmessage", methods = ["POST"])
def checkMessage():
	# Get channel name to check message count
	channel = request.form.get('channel')

	# If >100 messages in a channel, delete the oldest message
	if(len(chatObject[channel]) > 100):
		chatObject[channel].pop(0)

	return jsonify({"change": True})


@app.route("/changechannel", methods = ["POST"])
def changeChannel():
	# Return chatObject JSON
	return jsonify(chatObject)


@socketio.on("submit channel")
def emitNewChannel(data):
	# Get channel name from input
	channelName = data["channelName"]

	# Create new channel
	chatObject[channelName] = []

	# Emit changes. Return channel name.
	emit("new channel", channelName, broadcast=True)

@socketio.on("submit message")
def emitNewMessage(data):
	# Get info from input
	channel = data['channel']
	username = data['username']
	time = data['time']
	message = data['message']

	#Create new message object
	newMessage = {
		"Message":message,
		"Username":username,
		"Time":time
	}

	# Append new message to channel
	chatObject[channel].append(newMessage)

	newMessage["Channel"] = channel;

	# Emit changes. Return message object.
	emit("new message", newMessage, broadcast=True)



