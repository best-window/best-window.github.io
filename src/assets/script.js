(function(){

	function menuInteraction(menuToggler, menu) {
		function eventHandler(event) {
			menu.classList.toggle("is-open");
			menuToggler.classList.toggle("is-open");
			document.body.classList.toggle("menu-open");
		}

		menuToggler.addEventListener("click", eventHandler);
	}
	
	menuInteraction(
		document.getElementById("menu_toggler"),
		document.getElementById("main_menu")
	);

	function setCSSSidebarWidthCorrection(scrollableParent, scrollableChild) {
		var sidebarWidth = scrollableParent.getBoundingClientRect().width - scrollableChild.getBoundingClientRect().width;
		document.documentElement.style.setProperty('--sidebar-width', sidebarWidth + "px");
	}

	setCSSSidebarWidthCorrection(
		document.querySelector(".main"),
		document.querySelector(".section")
	);

	function formInteraction(contactForm) {
		var inputs = [
			contactForm.elements.name,
			contactForm.elements.mail,
			contactForm.elements.phone,
		];

		var textarea = contactForm.elements.message;

		function clickEventHandler(event) {

			if (
				contactForm.contains(document.activeElement) &&
				( 
					inputs.includes(document.activeElement) ||
					textarea === document.activeElement
				)
			) {
				var prevFocus = contactForm.querySelectorAll(".focused");
				for (var i = 0; i < prevFocus.length; i++) prevFocus[i].classList.remove("focused");

				document.activeElement.previousElementSibling.classList.add("focused");

			} else {
				for (var i = 0; i < inputs.length; i++)
					inputs[i].previousElementSibling.classList.remove("focused");

				textarea.previousElementSibling.classList.remove("focused");
			}

		}

		document.addEventListener("click", clickEventHandler);

		function changeEventHandler(event) {
			if (event.target.value.length) event.target.previousElementSibling.classList.add("filled")
			else event.target.previousElementSibling.classList.remove("filled")
		}

		for (var i = 0; i < inputs.length; i++) 
			inputs[i].addEventListener("change", changeEventHandler)

		textarea.addEventListener("change", changeEventHandler)
	}

	formInteraction(document.querySelector("#kontakt form"));
	
})();