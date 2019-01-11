function check() {
    if (document.getElementById('reviewtext').value=="" || document.getElementById('reviewtext').value==undefined) {
        alert ("Please write a review before submitting.");
        return false;
    }
    return true;
}