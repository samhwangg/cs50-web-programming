function check() {
    if (document.getElementById('search').value=="" || document.getElementById('search').value==undefined) {
        alert ("Please input the book or author you want to find.");
        return false;
    }
    return true;
}