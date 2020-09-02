'use strict';
const navbar = document.getElementById("sidebar")
const media = window.matchMedia("(max-width: 900px)")

function openNavbar() {
	navbar.classList.add("expanded")

	navbar.children[1].classList.remove("displayed")
	navbar.children[1].classList.add("hidden")

	navbar.children[2].classList.add("displayed")
	navbar.children[2].classList.remove("hidden")
}

function closeNavbar() {
	navbar.classList.remove("expanded")

	navbar.children[1].classList.add("displayed")
	navbar.children[1].classList.remove("hidden")

	navbar.children[2].classList.remove("displayed")
	navbar.children[2].classList.add("hidden")
}

navbar.children[1].addEventListener("click", openNavbar)
navbar.children[2].addEventListener("click", closeNavbar)

media.addListener(() => {
	if (!navbar.classList.contains("expanded")) return
	navbar.classList.remove("expanded")

	navbar.children[1].classList.add("displayed")
	navbar.children[1].classList.remove("hidden")

	navbar.children[2].classList.remove("displayed")
	navbar.children[2].classList.add("hidden")
})


const navigation = document.getElementById("navigation")

navigation.addEventListener("click", event => {
	if (event.target === navigation) return;
	selectNavbarBtn(event.target)
	const index = [...navigation.children].indexOf(event.target)
	openPage(document.getElementsByClassName("page")[index])
})

const homeBtn = document.getElementById("home-button")
const homePage = document.getElementById("home")

const projectsBtn = document.getElementById("projects-button")
const projectsPage = document.getElementById("projects")

const musicBtn = document.getElementById("music-button")
const musicPage = document.getElementById("music")

const aboutBtn = document.getElementById("about-button")
const aboutPage = document.getElementById("about")

function selectNavbarBtn(btn) {
	homeBtn.classList.remove("selected")
	projectsBtn.classList.remove("selected")
	musicBtn.classList.remove("selected")
	aboutBtn.classList.remove("selected")

	btn.classList.add("selected")
}

function openPage(page) {
	// stop all music
	if (musicPage.classList.contains("displayed") && page != musicPage) {
		for (let track of tracks) {
			const player = SC.Widget(track.children[0])
			player.pause()
			player.seekTo(0)
			track.children[2].children[1].src = "/icons/Play.svg"
		}
	}
	// hide all pages
	homePage.classList.remove("displayed")
	projectsPage.classList.remove("displayed")
	musicPage.classList.remove("displayed")
	aboutPage.classList.remove("displayed")

	page.classList.add("displayed")
	page.scrollTop = 0
	window.location.hash = page.id

	document.title = "Dougal Stewart - " + page.id.charAt(0).toUpperCase() + page.id.slice(1)

	// close navigation menu (only works on mobile)
	if (navbar.classList.contains("expanded"))
		closeNavbar()
}

navigation.addEventListener("keydown", event => {
	switch(event.key) {
		case "Enter":
			event.target.focus()
			break;
		case "ArrowRight":
			let displayedPage = document.getElementsByClassName("page displayed")[0]
			displayedPage.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')[0].focus()
			break;
	}
})

navigation.addEventListener("mousedown", event => {
	event.preventDefault()
})

homeBtn.addEventListener("keydown", event => {
	switch (event.key) {
		case "Enter":
			selectNavbarBtn(homeBtn)
			openPage(homePage)
			break;
		case "ArrowUp":
			break;
		case "ArrowDown":
			homeBtn.nextElementSibling.focus()
			break;
	}
})

projectsBtn.addEventListener("keydown", () => {
	switch (event.key) {
		case "Enter":
			selectNavbarBtn(projectsBtn)
			openPage(projectsPage)
			break;
		case "ArrowUp":
			projectsBtn.previousElementSibling.focus()
			break;
		case "ArrowDown":
			projectsBtn.nextElementSibling.focus()
			break;
	}
})

musicBtn.addEventListener("keydown", () => {
	switch (event.key) {
		case "Enter":
			selectNavbarBtn(musicBtn)
			openPage(musicPage)
			break;
		case "ArrowUp":
			musicBtn.previousElementSibling.focus()
			break;
		case "ArrowDown":
			musicBtn.nextElementSibling.focus()
			break;
	}
})

aboutBtn.addEventListener("keydown", () => {
	switch (event.key) {
		case "Enter":
			selectNavbarBtn(aboutBtn)
			openPage(aboutPage)
			break;
		case "ArrowUp":
			aboutBtn.previousElementSibling.focus()
			break;
		case "ArrowDown":
			break;
	}
})

function gotoPageAnchor() {
	let curr_anchor = window.location.hash.substr(1)
	let anchor_elem = document.getElementById(curr_anchor)
	for (let elem = anchor_elem; elem && elem.tagName != "BODY"; elem = elem.parentNode) {
		let found = false
		switch (elem) {
			case homePage:
				selectNavbarBtn(homeBtn)
				found = true;
				break;
			case projectsPage:
				selectNavbarBtn(projectsBtn)
				found = true;
				break;
			case musicPage:
				selectNavbarBtn(musicBtn)
				found = true;
				break;
			case aboutPage:
				selectNavbarBtn(aboutBtn)
				found = true;
				break;
		}

		if (found) {
			openPage(elem)
			anchor_elem.scrollIntoView()
		}
	}
}

gotoPageAnchor()


const footer = document.getElementById("footer"),
      user = "dougal.koji",
      domain = "gmail.com"
footer.innerHTML = "<p>Email:</p><a href=\"mailto:" + user + "@" + domain + "\">" + user + "@" + domain + "</a>" + footer.innerHTML
