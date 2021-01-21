(function(){
	var menuToggler = document.getElementById("menu_toggler");
	var menu = document.getElementById("main_menu");

	function toggleMenu(event) {
		menu.classList.toggle("is-open");
		menuToggler.classList.toggle("is-open");
		document.body.classList.toggle("menu-open");
	}
	
	function setCSSSidebarWidthCorrection() {
		const scrollableParent = document.querySelector(".main");
		const scrollableChild = document.querySelector(".section");
		const sidebarWidth = scrollableParent.getBoundingClientRect().width - scrollableChild.getBoundingClientRect().width;
		document.documentElement.style.setProperty('--sidebar-width', sidebarWidth + "px");
	}

	setCSSSidebarWidthCorrection();

	menuToggler.addEventListener("click", toggleMenu);
	
})();