var tracks = document.getElementsByClassName("track");
for (let i = 0; i < tracks.length; ++i) {
	let player = SC.Widget(tracks[i].children[0]);

	// Set info
	player.bind(SC.Widget.Events.READY, function(e) {
		player.getCurrentSound(function(sound) {
			var artworkUrl = sound.artwork_url || 'Fallback-Cover-Art.png';
			tracks[i].children[1].children[2].href = sound.permalink_url;
			tracks[i].children[2].children[0].href = sound.permalink_url;
			tracks[i].children[2].children[0].innerText = sound.title;
			tracks[i].children[1].children[1].setAttribute('style', "background-image: url("+artworkUrl+")");
		});
	});

	// Add event listeners for multimedia controls
	tracks[i].children[1].children[0].addEventListener("click", function(){
		player.toggle();
		if (tracks[i].children[1].children[0].src.substr(-9) === "Pause.svg")
			tracks[i].children[1].children[0].src = "/icons/Play.svg";
		else
			tracks[i].children[1].children[0].src = "/icons/Pause.svg";
	});

	// Reset widget if the track finishes
	player.bind(SC.Widget.Events.FINISH, function(e) {
		tracks[i].children[1].children[0].src = "/icons/Play.svg";
		player.seekTo(0);
	})
}
