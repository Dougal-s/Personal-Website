// For toggling the navbar on and off
var visible = false;
var transparency = 0.0;
var navBar = document.getElementById("navBar");

if (document.documentElement.scrollTop > 0) {
	visible = true;
	transparency = 1.0;
	navBar.style.backgroundColor = "#212121ff";
	navBar.style.boxShadow = "0 4px 8px 0 #00000033";
}

window.addEventListener('scroll', function(event) {
	var last = performance.now();
	if (document.documentElement.scrollTop <= 0) {
		visible = false;
		window.requestAnimationFrame(toggleOff);
	} else if (visible === false) {
		visible = true;
		window.requestAnimationFrame(toggleOn);
	}

	function toggleOn(timestamp) {
		let step = timestamp - last;
		transparency = Math.min(transparency+0.005*step, 1.0); // normalise to [0, 1]
		navBar.style.backgroundColor = "#212121" + ("0" + Math.floor(255*transparency).toString(16)).substr(-2);
		navBar.style.boxShadow = "0 4px 8px 0 #000000" + ("0" + Math.floor(51*transparency).toString(16)).substr(-2);

		last = timestamp;
		if (transparency != 1.0 && visible === true) window.requestAnimationFrame(toggleOn);
	}

	function toggleOff(timestamp) {
		let step = timestamp - last;
		transparency = Math.max(transparency-0.005*step, 0.0); // normalise to [0, 1]
		navBar.style.backgroundColor = "#212121" + ("0" + Math.floor(255*transparency).toString(16)).substr(-2);
		navBar.style.boxShadow = "0 4px 8px 0 #000000" + ("0" + Math.floor(51*transparency).toString(16)).substr(-2);

		last = timestamp;
		if (transparency != 0.0 && visible == false) window.requestAnimationFrame(toggleOff);
	}
});

// For expanding hamburger menu
var navBarRight = document.getElementById('navBar-right');
function toggleMenubar() {
	if (navBarRight.style.display == "") navBarRight.style.display = "flex";
	else navBarRight.style.display = null;
}
