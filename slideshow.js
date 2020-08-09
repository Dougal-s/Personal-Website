'use strict';
const slideshow = document.getElementById("project-slideshow")
function nextSlide() {
	let displayed = slideshow.children[1].getElementsByClassName("displayed")[0]
	displayed.classList.remove("displayed")
	let index = [...displayed.parentNode.children].indexOf(displayed)
	index = (index+1)%displayed.parentNode.children.length
	displayed.parentNode.children[index].classList.add("displayed")
}

function lastSlide() {
	let displayed = slideshow.children[1].getElementsByClassName("displayed")[0]
	displayed.classList.remove("displayed")
	let index = [...displayed.parentNode.children].indexOf(displayed)
	index = (index+displayed.parentNode.children.length-1)%displayed.parentNode.children.length
	displayed.parentNode.children[index].classList.add("displayed")
}

slideshow.children[0].addEventListener("click", lastSlide)
slideshow.children[0].addEventListener("mousedown", event => { event.preventDefault() });
slideshow.children[0].addEventListener("keydown", event => {
	if (event.key == "Enter")
		lastSlide()
})

slideshow.children[2].addEventListener("click", nextSlide)
slideshow.children[2].addEventListener("mousedown", event => { event.preventDefault() });
slideshow.children[2].addEventListener("keydown", event => {
	if (event.key == "Enter")
		nextSlide()
})


slideshow.children[1].addEventListener("keydown", event => {
	switch(event.key) {
		case "ArrowLeft":
			lastSlide();
			break;
		case "ArrowRight":
			nextSlide();
			break;
	}
	slideshow.getElementsByClassName("displayed")[0].focus()
})
