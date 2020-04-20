var tracks = document.getElementsByClassName("track");
for (let track of tracks) {
	let player = SC.Widget(track.children[0]);

	// Set info
	player.bind(SC.Widget.Events.READY, function() {
		player.getCurrentSound(sound => {
			let artworkUrl = sound.artwork_url;
			if (artworkUrl) artworkUrl = artworkUrl.slice(0, -9) + "t500x500.jpg";
			else artworkUrl = 'Fallback-Cover-Art.png';
			track.children[1].children[2].href = sound.permalink_url;
			track.children[2].children[0].href = sound.permalink_url;
			track.children[2].children[0].innerText = sound.title;
			track.children[1].children[1].style.backgroundImage = "url("+artworkUrl+")";
			track.children[3].style.backgroundImage = "url("+artworkUrl+")";
		});
	});

	// Add event listeners for multimedia controls
	track.children[1].children[0].addEventListener("click", function(){
		player.toggle();
		if (this.src.substr(-9) === "Pause.svg") this.src = "/icons/Play.svg";
		else this.src = "/icons/Pause.svg";
	});

	// Reset widget if the track finishes
	player.bind(SC.Widget.Events.FINISH, function() {
		track.children[1].children[0].src = "/icons/Play.svg";
		player.seekTo(0);
	})
}
