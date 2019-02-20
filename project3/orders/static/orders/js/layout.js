document.addEventListener('DOMContentLoaded', () => {

	var navbarList = document.getElementById('navbar-list').getElementsByTagName('li');

	function loadNavbarOnClick() {
		for(var i = 0; i < navbarList.length; i++)
		{
			navbarList[i].addEventListener('click', function() {
				var activeNav = document.querySelector('.active');
				if(this === activeNav) {
					return false;
				}
				else {
					activeNav.classList.remove("active");
				}
			}, false);
		}
	}

	window.addEventListener("DOMContentLoaded", loadNavbarOnClick(), false);


});