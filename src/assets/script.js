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

	//formInteraction(document.querySelector("#kontakt form"));

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

	asideInteraction(document.querySelectorAll(".aside"));

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
		}
	});
	
	function handlePopup(itemList) {
		var closeBtn = document.createElement("button");
		closeBtn.classList.add("close");
		closeBtn.innerHTML = "Powrót"

		closeBtn.addEventListener("click", function(event) {
			event.target.parentNode.classList.remove("open");
		});

		function show(popup) {
			popup.classList.add("open");
			var sourceNodes = popup.querySelectorAll("[data-src]");
			for (var i = 0; i < sourceNodes.length; i++) {
				sourceNodes[i].setAttribute("src", sourceNodes[i].dataset.src);
				sourceNodes[i].removeAttribute("data-src");
			}
			popup.prepend(closeBtn);
		}

		for (var i = 0; i < itemList.children.length; i++) {
			(function(i) {
				var popup = itemList.children[i].querySelector(".popup");
				itemList.children[i].addEventListener("click", function(event) {
					if (event.target !== closeBtn) show(popup)
				});

				var imageNodes = itemList.children[i].querySelectorAll(".popup img");

				var sliderContainer = document.createElement("div");
				sliderContainer.classList.add("popup_slider");

				var sliderNav = document.createElement("nav");
				sliderNav.classList.add("popup_slider-nav");
				popup.prepend(sliderContainer, sliderNav);

				var popupContent = document.createElement("div");
				popupContent.classList.add("popup_content");

				var content = itemList.children[i].querySelectorAll("h4, p");

				for (var j = 0; j < content.length; j++)
					popupContent.appendChild(content[j].cloneNode(true));

				popup.appendChild(popupContent);

				function changeSlide(index) {
					for (var j = 0; j < imageNodes.length; j++) {
						imageNodes[j].classList.remove("current");
						sliderNav.children[j].classList.remove("current");
					}
					imageNodes[index].classList.add("current");
					sliderNav.children[index].classList.add("current");
				}

				for (var j = 0; j < imageNodes.length; j++) {
					(function(j) {
						!j&&imageNodes[j].classList.add("current");
						sliderContainer.appendChild(imageNodes[j]);
						sliderNav.appendChild(imageNodes[j].cloneNode(true));
						sliderNav.children[j].addEventListener("click", function() {changeSlide(j)})
						!j&&sliderNav.children[j].classList.add("current");
					}).call(this, j);

				}
			}).call(this, i);
		}
	}

	handlePopup(document.querySelector(".realizacje_list"));

	function handleTabs(tabNodes) {
		var tabs = document.createElement("nav");
		tabs.classList.add("tabs");

		var tab = document.createElement("button");

		function handleChange(index) {
			for(var i = 0; i < tabNodes.length; i++) {
				tabNodes[i].classList.remove("current");
				tabs.children[i].classList.remove("current");
				tabNodes[index].classList.add("current");
				tabs.children[index].classList.add("current");
			}
		}

		for (var i = 0; i < tabNodes.length; i++) {
			(function(i){
				tabs.appendChild(tab.cloneNode());
				tabs.children[i].innerHTML = tabNodes[i].querySelector("h4").innerHTML;
				tabs.children[i].addEventListener("click", function(){handleChange(i)});
			}).call(this, i);
		}

		tabNodes[0].parentNode.insertBefore(tabs, tabNodes[0]);
		tabNodes[0].classList.add("current");
		tabs.children[0].classList.add("current");
	}

	handleTabs(document.querySelectorAll(".oferta_single"));

})();