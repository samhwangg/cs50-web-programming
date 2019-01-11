function check() {
    if (document.getElementById('username').value=="" || document.getElementById('reviewtext').value==undefined 
    	|| document.getElementById('password').value=="" || document.getElementById('password').value==undefined) {
        alert ("Please input a username and a password.");
        return false;
    }
    return true;
}