function check() {
    if(document.getElementById('username').value=="" || document.getElementById('username').value==undefined 
    	|| document.getElementById('password').value=="" || document.getElementById('password').value==undefined 
    	|| document.getElementById('password2').value=="" || document.getElementById('password2').value==undefined) {
        alert("Please complete all fields.");
        return false;
    }
    else if(document.getElementById('password').value!=document.getElementById('password2').value) {
    	alert("Passwords do not match.")
    	return false;
    }
    return true;
}