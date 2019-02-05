document.addEventListener('DOMContentLoaded', () => {

	// Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

	// Username form disabled by default
	document.querySelector('#submitUsername').disabled = true;
	document.querySelector('#message-button').disabled = true;

	// Check if username already defined
	if(localStorage.getItem('username')) {
		showUsername();
		document.querySelector('#user-display').innerHTML = localStorage.getItem('username');
	}
	else {
		showLogin();
	}

	// Enable button if there is text in the form
	document.querySelector('#username').onkeyup = () => {
		if(document.querySelector('#username').value.length > 0) {
			document.querySelector('#submitUsername').disabled = false;
		}
		else 
			document.querySelector('#submitUsername').disabled = true;
	};

	// Create username & store in localStorage
    document.querySelector('#usernameInitialize').onsubmit = () => {
    	// Store the username in localStorage
    	let username = document.querySelector('#username').value;
        localStorage.setItem('username', username);

        // Alter H2 tag to display username
        document.querySelector('#user-display').innerHTML = username;

        // Reset form and don't allow submission
        document.querySelector('#username').value = '';
        document.querySelector('#submitUsername').disabled = true;
        showUsername();
        if(localStorage.getItem('currChannel'))
        	changeChannel(localStorage.getItem('currChannel'));
        return false;

    };

    // Delete from local storage and show login prompt
    document.querySelector('#logout').onclick = () => {
    	localStorage.removeItem('username');
    	document.querySelector('#user-display').innerHTML = '';
    	if(localStorage.getItem('currChannel'))
        	changeChannel(localStorage.getItem('currChannel'));
    	showLogin();
    };

    // Hide Login and show Username
    function showUsername() {
		document.getElementById('sidenav-login').style.display = "none";
		document.getElementById('sidenav-username').style.display = "block";
		document.getElementById('logout').style.display = "block";
	}

	// Hide Username and show Login
	function showLogin() {
		document.getElementById('sidenav-login').style.display = "block";
		document.getElementById('sidenav-username').style.display = "none";
		document.getElementById('logout').style.display = "none";
	}

	// Open/Close modal functions
	var modal = document.getElementById('new-channel-modal');
	var newChannelInput = document.querySelector('#newChannelInput');
	var channelSubmitInput = document.getElementById('submitChannelName');
	var buttonModal = document.getElementsByClassName('open-modal')[0];
	var modalSpan = document.getElementsByClassName('close-modal')[0];

	buttonModal.onclick = () => {
		modal.style.display = "block";
		channelSubmitInput.disabled = true;
	};

	modalSpan.onclick = () => {
		modal.style.display = "none";
	};

	window.onclick = function(event) {
		if(event.target == modal) {
			modal.style.display = "none";
		}
	};

	// Disable/Enable Channel Create Button
	newChannelInput.onkeyup = () => {
		if(newChannelInput.value.length > 0) {
			channelSubmitInput.disabled = false;
		}
		else 
			channelSubmitInput.disabled = true;
	};

	// Create new 'li' element for channel list when creating a new channel
	function createNewChannel(newChannelName) {
		var channelList = document.getElementById('sidenav-channel-list');
        var newLi = document.createElement("li");
        var newDiv= document.createElement("div");
        newDiv.innerHTML = "# " + newChannelName;
        newLi.setAttribute('id', newChannelName);
        newLi.appendChild(newDiv);
        channelList.appendChild(newLi);
        loadChannelOnClick();
        channelList.scrollTop = channelList.scrollHeight;
	}

	// When connected, configure websocket functions
    socket.on('connect', () => {
    	// Websocket for create channel
    	document.querySelector('#create-channel').onsubmit = () => {
			if(!localStorage.getItem('username')) {
				alert("Please log in before creating a new channel.");
				return false;
			}

			// Get new channel name from form
	        const newChannelName = newChannelInput.value;

	        // Create new AJAX request to /checkchannel
			const request = new XMLHttpRequest();
	        request.open('POST', '/checkchannel');

	        // Callback funtion after request loads
	        request.onload = () => {
	        	const data = JSON.parse(request.responseText);
	        	if(data.success) {
		            // No collision. Emit channel change event.
		            socket.emit('submit channel', {
		            	'channelName': newChannelName,
		            	'username': localStorage.getItem('username')
		            });	

		            // Close modal and cancel form submission
					newChannelInput.value = '';
					channelSubmitInput.disabled = true;
					modal.style.display = "none";
		        }
		        else {
		        	alert("Channel name taken. Please choose a different name.");
		        	return false;
		        }
	        }

	        // Create the "form" data and add data to send with request
	        const data = new FormData();
	        data.append('newChannelInput', newChannelName);

	        // Send request
	        request.send(data);

	        // Cancel form submission
			return false;
		};
    });

    // New channel creation is announced. Create new channel.
    socket.on('new channel', data => {
    	createNewChannel(data.channelName);
    	// only the user who created the channel will change to new channel
    	if(data.username === localStorage.getItem('username'))
    		changeChannel(data.channelName);
    });

	// Disable/Enable Message Send Button
	document.querySelector('#message-input').onkeyup = () => {
		if(document.querySelector('#message-input').value.length > 0) {
			document.querySelector('#message-button').disabled = false;
		}
		else 
			document.querySelector('#message-button').disabled = true;
	};

	var isTyping = document.getElementById('is-typing');
	var canPublish = true;
	var throttleTime = 200;
	var clearInterval = 900;
	var clearTimerId;

	socket.on('connect', () => {
    	// Typing Indicator
		document.querySelector('#message-input').onkeydown = (event) => {
			// Don't indicate typing when user is not logged in
			if(!localStorage.getItem('username'))
				return;
			// Don't indicate typing when user presses 'Enter'
			if(event.keyCode === 13)
				return;
			if(canPublish) {
				socket.emit('submit typing', {
					'username': localStorage.getItem('username'),
					'channel': localStorage.getItem('currChannel')
				});
				canPublish = false;
				setTimeout(function() {
					canPublish = true;
				}, throttleTime);
			}
		};
    });

	socket.on('new typing', data => {
		// if username is not the same and on the same channel, indicate typing
		if(data.username != localStorage.getItem('username') && data.channel === localStorage.getItem('currChannel')) {
			isTyping.innerHTML = data.username + " is typing...";
			// restart timeout timer
		    clearTimeout(clearTimerId);
		    clearTimerId = setTimeout(function () {
		      // clear 'user is typing message'
		      isTyping.innerHTML = '';
		    }, clearInterval);
		}
	});

	var channelListTag = document.getElementById('sidenav-channel-list').getElementsByTagName('li');

	function clearChannelBackground() {
		for(var j=0; j<channelListTag.length; j++)
			channelListTag[j].style.background = "";
	}

	// Dynamically create onclick for each channel
	function loadChannelOnClick() {
		for(var i = 0; i < channelListTag.length; i++)
		{
			channelListTag[i].addEventListener('click', function() {
				// do nothing if click on same channel
				if(localStorage.getItem('currChannel') === this.id)
					return false;
				clearChannelBackground();
				changeChannel(this.id);
			}, false);
		}
	}

	// Change channel and reload messages using AJAX
	function changeChannel(channelName) {
		// clear current message list
		var messageList = document.getElementById('message-display-list');
		messageList.innerHTML = "";

		// Create new AJAX request to /changechannel
		const request = new XMLHttpRequest();
        request.open('POST', '/changechannel');

        // parse JSON
        request.onload = () => {
        	const data = JSON.parse(request.responseText);
        	for(var i = 0; i < data[channelName].length; i++) {
        		username = data[channelName][i]["Username"];
        		time = data[channelName][i]["Time"];
        		message = data[channelName][i]["Message"];
        		createMessage(username, time, message);
        	}
        }
        request.send(null);

        // change localStorage
        localStorage.setItem('currChannel', channelName);

        var channelStyle = document.getElementById(channelName);
        channelStyle.style.background = "rgba(0,0,0,0.7)";
	}

	// Create Timestamp
	function getTime() {
		var time = new Date();
		var hours = time.getHours();
		var minutes = time.getMinutes();
		var ampm;
		if(hours >= 12) {
			if(hours > 12)
				hours -= 12;
			ampm = " PM";
		}
		else {
			if(hours === 0)
				hours = 12;
			ampm = " AM";
		}
		if(minutes < 10)
			return hours+":0"+minutes+ampm;
		else
			return hours+":"+minutes+ampm;
	}

	// Create new message and add to list
	function createMessage(username, time, messageContent) {
		// create elements of message block
		var messageList = document.getElementById('message-display-list');
		var newLi = document.createElement("li");
		var newDivMessage = document.createElement("div");
		var newDivUsername = document.createElement("div");
		var newDivTime = document.createElement("div");
		var newMessageText = document.createElement("p");

		// set classes
		if(localStorage.getItem('username') === username) {
			newDivMessage.setAttribute('class', "my-message");
		}
		else {
			newDivMessage.setAttribute('class', "receive-message");
		}
		newDivUsername.setAttribute('class', "username-message-display");
		newDivTime.setAttribute('class', "message-time");

		// fill content
		newDivUsername.innerHTML = username;
		newMessageText.innerHTML = messageContent;
		newDivTime.innerHTML = time;

		// layer elements and append to unordered list
		newDivUsername.appendChild(newDivTime);
		newDivMessage.appendChild(newDivUsername);
		newDivMessage.appendChild(newMessageText);
		newLi.appendChild(newDivMessage)
		messageList.appendChild(newLi);

		// makes sure scroll bar is on very bottom
		messageList.scrollTop = messageList.scrollHeight;
	}

	// When connected, configure websocket functions
	socket.on('connect', () => {
		// Call createMessage when user submits a message
		document.querySelector('#sendMessage').onsubmit = () => {
			// don't allow message sending if user is not logged in/selected a channel
			if(!localStorage.getItem('username')) {
				alert("Please log in before sending a message.");
				return false;
			}
			if(!localStorage.getItem('currChannel')) {
				alert("Please select a channel before sending a message");
				return false;
			}

			// get message content and timestamp
			var messageInput = document.getElementById('message-input');
			var messageContent = messageInput.value;
			var currTime = getTime();

			// AJAX request to check if message count >100
			// Create new AJAX request to /checkmessage
			const request = new XMLHttpRequest();
	        request.open('POST', '/checkmessage');

	        // check if return JSON indicates messages <100
	        request.onload = () => {
	        	const data = JSON.parse(request.responseText);
	        	if(data.change) {
	        		socket.emit('submit message', {
	        			'channel':localStorage.getItem('currChannel'),
	        			'username': localStorage.getItem('username'),
	        			'time':currTime,
	        			'message':messageContent
	        		});
	        		//changeChannel(localStorage.getItem('currChannel'));
	        	}
	        	else {
	        		alert("Too many messages. Please try again later.");
	        		return false;
	        	}
	        }

	        // Create form data to send with AJAX
	        const data = new FormData();
	        data.append('channel', localStorage.getItem('currChannel'));

	        // Send request
	        request.send(data);

			// clear field and stop form from submitting
			messageInput.value = '';
			return false;
		};
	});

	// New message creation is announced. Create new message if on same channel.
    socket.on('new message', data => {
    	if(localStorage.getItem('currChannel') === data.Channel)
    		createMessage(data.Username, data.Time, data.Message);
    });

    // load channel onClick functions once page is finished loading
	window.addEventListener("DOMContentLoaded", loadChannelOnClick(), false);

	// check if channel exists before loading
	window.addEventListener("DOMContentLoaded", function() {
		// Create new AJAX request to /checkchannel
		const request = new XMLHttpRequest();
        request.open('POST', '/checkchannel');

        // Load if channel exists, clear localStorage if not
        request.onload = () => {
        	const data = JSON.parse(request.responseText);
        	if(data.success) {
	            // Return true means channel does not exist
	            localStorage.removeItem('currChannel');
	        }
	        else {
	        	// Return false means channel does exist
				changeChannel(localStorage.getItem('currChannel'))
	        }
        }

        // Create the "form" data and add data to send with request
        const data = new FormData();
        data.append('newChannelInput', localStorage.getItem('currChannel'));

        // Send request
        request.send(data);

	}, false);

});
