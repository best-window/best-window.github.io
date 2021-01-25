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

		textarea.addEventListener("change", changeEventHandler);

		
	}

	formInteraction(document.querySelector("#kontakt form"));

	function asideInteraction(asides) {
		function expandHandler(event) {
			event.target.parentNode.classList.toggle("is-expanded");
			event.target.classList.toggle("is-expanded");
		}

		for (var i = 0; i < asides.length; i++) {
			var expandBtn = asides[i].querySelector(".aside_expand");
			if (expandBtn) expandBtn.addEventListener("click", expandHandler);
		}
	}

	asideInteraction(document.querySelectorAll(".section_aside"));

	function lazyLoad(images) {
		for (var i = 0; i < images.length; i++) {
			images[i].setAttribute("src", images[i].dataset.src);
		}
	}

	function slider(sliderNode) {
		if (!sliderNode.children[0]) return;
		sliderNode.children[0].classList.add("current");
		if (!sliderNode.children[1]) return;
		setInterval(function() {
			var current = sliderNode.querySelector(".current");
			current.classList.remove("current");
			if (current.nextElementSibling) current.nextElementSibling.classList.add("current")
			else sliderNode.children[0].classList.add("current");
		}, 15000);
	}

	
	document.addEventListener("readystatechange", function(event) {
		if (event.target.readyState === "complete") {
			slider(document.querySelector("#main_slider"));
			lazyLoad(document.querySelectorAll("img[data-src], iframe[data-src]"));
		}
	});
	
	
})();