var header = document.getElementById('header-image');
window.addEventListener('scroll', function(event) {
	let scroll = Math.max(document.documentElement.scrollTop, 0);
	scroll *= 24/header.clientHeight;
	header.style.filter = `blur(${scroll}px)`;
	let scaleX = 100+400*scroll/header.clientWidth;
	let scaleY = 100+400*scroll/header.clientHeight;
	header.style.width = `${scaleX}%`;
	header.style.height = `${scaleY}%`;
	header.style.margin = `-${2*scroll}px`;
});
