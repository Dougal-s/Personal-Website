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

let open = false;
var counter = 0.0;
var contactPage = document.getElementById('contact-page');

function openContactPage() {
	disableScrolling();
	contactPage.style.display = "block";
	open = true;
	var last = performance.now();
	window.requestAnimationFrame(openContactPageAnim);

	function openContactPageAnim(timestamp) {
		let stepSize = timestamp-last;
		counter = Math.min(counter+0.004*stepSize, 1.0);

		let transparency = Math.sin(counter*Math.PI*0.5)*100;
		contactPage.style.opacity = transparency.toString()+"%";
		contactBox.style.top = (100-transparency/2).toString()+"%";

		last = timestamp;
		if (open === true && counter != 1.0) window.requestAnimationFrame(openContactPageAnim);
	}
}

function closeContactPage() {
	enableScrolling();
	open = false;
	var last = performance.now();
	window.requestAnimationFrame(closeContactPageAnim);

	function closeContactPageAnim(timestamp) {
		let stepSize = timestamp-last;
		counter = Math.max(counter-0.004*stepSize, 0.0);

		let transparency = Math.sin(counter*Math.PI*0.5)*100;
		contactPage.style.opacity = transparency.toString()+"%";
		contactBox.style.top = (100-transparency/2).toString()+"%";

		last = timestamp;
		if (open === false && counter != 0.0) window.requestAnimationFrame(closeContactPageAnim);
		else contactPage.style.display = "none";
	}
}
