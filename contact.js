function preventDefault(e) { e.preventDefault(); }

function enableScrolling() {
	window.removeEventListener("touchmove", preventDefault, {passive: false});
	window.removeEventListener("wheel", preventDefault, {passive: false});
}

function disableScrolling() {
	window.addEventListener("touchmove", preventDefault, {passive: false});
	window.addEventListener("wheel", preventDefault, {passive: false});
}

var contactBox = document.getElementById("contact-content-box");
contactBox.addEventListener("click", function(e){e.stopPropagation();}, false);

var counter = 0.0;
var contactPage = document.getElementById('contact-page');

function openContactPage() {
	disableScrolling();
	contactPage.style.display = "block";
	let animation = setInterval(function() {
			counter = Math.min(counter+0.02, 1.0);
			let transparency = Math.sin(counter*Math.PI*0.5)*100;
			contactPage.style.opacity = transparency.toString()+"%";
			contactBox.style.top = (100-transparency/2).toString()+"%";

			if (counter === 1.0) clearInterval(animation);
		}, 1);
}

function closeContactPage() {
	enableScrolling();
	let animation = setInterval(function() {
		counter = Math.max(counter-0.02, 0.0);
		let transparency = Math.sin(counter*Math.PI*0.5)*100;
		contactPage.style.opacity = transparency.toString()+"%";
		contactBox.style.top = (100-0.5*transparency).toString()+"%";
		if (counter === 0.0) {
			clearInterval(animation);
			contactPage.style.display = "none";
		};
	}, 1);
}
