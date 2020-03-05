// For toggling the navbar on and off
var visible = false;
var transparency = 0;
var navBar = document.getElementById("navBar");

if (Math.max(document.documentElement.scrollTop, 0) > 0) {
	visible = true;
	transparency = 255;
	navBar.style.backgroundColor = "#212121ff";
	navBar.style.boxShadow = "0 4px 8px 0 #00000033";
}

window.addEventListener('scroll', function(event) {
	var scroll = Math.max(document.documentElement.scrollTop, 0);
	var animation;
	if (scroll === 0) {
		animation = setInterval(toggleOff, 4);
		visible = false;
	} else if (visible === false) {
		animation = setInterval(toggleOn, 4);
		visible = true;
	}

	function toggleOn() {
		transparency = Math.min(transparency+5, 255);
		navBar.style.backgroundColor = "#212121" + ("0" + transparency.toString(16)).substr(-2);
		navBar.style.boxShadow = "0 4px 8px 0 #000000" + ("0" + (51*transparency/255).toString(16)).substr(-2);

		if (transparency == 255 || visible === false) clearInterval(animation)
	}

	function toggleOff() {
		transparency = Math.max(transparency-5, 0);
		navBar.style.backgroundColor = "#212121" + ("0" + transparency.toString(16)).substr(-2);
		navBar.style.boxShadow = "0 4px 8px 0 #000000" + ("0" + (51*transparency/255).toString(16)).substr(-2);

		if (transparency == 0 || visible === true) clearInterval(animation)
	}
});

// For expanding hamburger menu
var navBarRight = document.getElementById('navBar-right');
function toggleMenubar() {
	if (navBarRight.style.display == "") navBarRight.style.display = "flex";
	else navBarRight.style.display = null;
}
