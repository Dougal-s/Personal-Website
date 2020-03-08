// For expanding hamburger menu
let navBarRight = document.getElementById('navBar-right');
function toggleMenubar() {
	if (navBarRight.style.display == "") navBarRight.style.display = "flex";
	else navBarRight.style.display = null;
}

// Highlight correct navbar button

function isVisible(element) {
	let top = 0;
	let iterator = element;
	while (!!iterator && iterator.tagName.toLowerCase() !== "body") {
		top += iterator.offsetTop;
		iterator = iterator.offsetParent;
	}
	return top-0.25*window.innerHeight <= document.documentElement.scrollTop;
}

function highlightNavBarElem() {
	for (let i = navBarRight.children.length-1; i >= 0; --i) {
		let targetID = navBarRight.children[i].getAttribute("href").substr(1);
		let targetElem = document.getElementById(targetID);

		if (isVisible(targetElem)) {
			for (let child of navBarRight.children) child.id = null;
			navBarRight.children[i].id = "navBar-highlighted";
			break;
		}
	}
}

highlightNavBarElem();
window.addEventListener('scroll', highlightNavBarElem);
