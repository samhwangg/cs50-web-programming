document.addEventListener('DOMContentLoaded', () => {

	// Username form disabled by default
	document.querySelector('#submitUsername').disabled = true;

	// Check if username already defined
	if(localStorage.getItem('username')) {
		document.getElementById('usernameInitialize').style.display = "none";
		document.getElementById('logout').style.display = "block";
		document.querySelector('h2').innerHTML = localStorage.getItem('username');
	}
	else {
		document.getElementById('usernameInitialize').style.display = "block";
		document.getElementById('logout').style.display = "none";
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
        document.querySelector('h2').innerHTML = username;

        // Reset form and don't allow submission
        document.querySelector('#username').value = '';
        document.querySelector('#submitUsername').disabled = true;
        document.getElementById('usernameInitialize').style.display = "none";
        document.getElementById('logout').style.display = "block";
        return false;

    };

    document.querySelector('#logout').onclick = () => {
    	localStorage.removeItem('username');
    	document.querySelector('h2').innerHTML = '';
    	document.getElementById('usernameInitialize').style.display = "block";
    	document.getElementById('logout').style.display = "none";
    };

});