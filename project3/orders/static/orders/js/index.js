document.addEventListener('DOMContentLoaded', () => {

	var currNav = document.getElementById('home-nav');

	function assignHomeNavActive() {
		currNav.className = 'active';
	}
	
	window.addEventListener("DOMContentLoaded", assignHomeNavActive(), false);

});