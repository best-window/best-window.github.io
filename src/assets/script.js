(function(){
	var menuToggler = document.getElementById("menu_toggler");
	var menu = document.getElementById("main_menu");

	function toggleMenu(event) {
		menu.classList.toggle("is-open");
		menuToggler.classList.toggle("is-open");
		document.body.classList.toggle("menu-open");
	}
	
	menuToggler.addEventListener("click", toggleMenu);
})();