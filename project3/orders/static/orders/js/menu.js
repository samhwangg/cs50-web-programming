document.addEventListener('DOMContentLoaded', () => {

	var currNav = document.getElementById('menu-nav');

	function assignMenuNavActive() {
		currNav.className = 'active';
	}
	
	window.addEventListener("DOMContentLoaded", assignMenuNavActive(), false);

});