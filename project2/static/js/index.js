document.addEventListener('DOMContentLoaded', () => {

	// Username form disabled by default
	document.querySelector('#submitUsername').disabled = true;

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
        return false;

    };

    // Delete from local storage and show login prompt
    document.querySelector('#logout').onclick = () => {
    	localStorage.removeItem('username');
    	document.querySelector('#user-display').innerHTML = '';
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

	newChannelInput.onkeyup = () => {
		if(newChannelInput.value.length > 0) {
			channelSubmitInput.disabled = false;
		}
		else 
			channelSubmitInput.disabled = true;
	};

	// AJAX Request to create a new channel
	document.querySelector('#create-channel').onsubmit = () => {

		// Create new AJAX request
		const request = new XMLHttpRequest();
        const newChannelName = newChannelInput.value;
        request.open('POST', '/addchannel');

        // Callback function for when request completes
        request.onload = () => {
        	const data = JSON.parse(request.responseText);
            var channelList = document.getElementById('sidenav-channel-list');
            var newLi = document.createElement("li");
            var newA = document.createElement("a");
            newA.innerHTML = "# " + newChannelName;
            newA.setAttribute('href', "#");
            newLi.appendChild(newA);
            channelList.appendChild(newLi);
        }

        // Create the "form" data and add data to send with request
        const data = new FormData();
        data.append('newChannelInput', newChannelName);

        // Send request
        request.send(data);

		// Close modal and cancel form submission
		newChannelInput.value = '';
		channelSubmitInput.disabled = true;
		modal.style.display = "none";
		return false;
	};

});

