function preventDefault(e) { e.preventDefault(); }

function enableScrolling() {
	window.removeEventListener("touchmove", preventDefault, {passive: false});
	window.removeEventListener("wheel", preventDefault, {passive: false});
}

function disableScrolling() {
	window.addEventListener("touchmove", preventDefault, {passive: false});
	window.addEventListener("wheel", preventDefault, {passive: false});
}

const contactBox = document.getElementById("contact-content-box");
contactBox.addEventListener("click", function(e){e.stopPropagation();}, false);

let open = false;
let counter = 0.0;
const contactPage = document.getElementById('contact-page');

function openContactPage() {
	disableScrolling();
	contactPage.style.display = "block";
	open = true;
	let last = performance.now();
	window.requestAnimationFrame(openContactPageAnim);

	function openContactPageAnim(timestamp) {
		counter = Math.min(counter+0.004*(timestamp-last), 1.0);
		let transparency = Math.sin(counter*Math.PI*0.5)*100;
		contactPage.style.opacity = transparency.toString()+"%";
		contactBox.style.top = (100-transparency/2).toString()+"%";

		last = timestamp;
		if (open && counter != 1.0) window.requestAnimationFrame(openContactPageAnim);
	}
}

function closeContactPage() {
	enableScrolling();
	open = false;
	let last = performance.now();
	window.requestAnimationFrame(closeContactPageAnim);

	function closeContactPageAnim(timestamp) {
		counter = Math.max(counter-0.004*(timestamp-last), 0.0);
		let transparency = Math.sin(counter*Math.PI*0.5)*100;
		contactPage.style.opacity = transparency.toString()+"%";
		contactBox.style.top = (100-transparency/2).toString()+"%";

		last = timestamp;
		if (!open && counter != 0.0) window.requestAnimationFrame(closeContactPageAnim);
		else contactPage.style.display = "none";
	}
}
