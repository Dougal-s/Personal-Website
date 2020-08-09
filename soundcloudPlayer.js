'use strict';
const tracks = document.getElementsByClassName("track");
for (let track of tracks) {
	const player = SC.Widget(track.children[0]);
	track.children[2].children[1].src = "/icons/Play.svg"

	// track length
	let duration = Infinity

	// Set info
	player.bind(SC.Widget.Events.READY, () => {
		player.getCurrentSound(sound => {
			let artworkUrl = sound.artwork_url
			if (artworkUrl) artworkUrl = artworkUrl.slice(0, -9) + "t500x500.jpg"
			else artworkUrl = 'Fallback-Cover-Art.webp'
			track.children[2].children[2].href = sound.permalink_url
			track.children[3].children[0].href = sound.permalink_url
			track.children[3].children[0].innerText = sound.title
			track.children[2].children[0].src = artworkUrl
			track.children[1].style.backgroundImage = "url("+artworkUrl+")"
		});
		player.getDuration(track_duration => { duration = track_duration })
	});

	// Add event listeners for multimedia controls
	track.children[2].children[1].addEventListener("click", function() {
		player.toggle()
		if (this.src.endsWith("Pause.svg")) this.src = "/icons/Play.svg"
		else {
			window.requestAnimationFrame(updateProgressBar)
			this.src = "/icons/Pause.svg"
		}
	});

	track.children[2].children[1].addEventListener("mousedown", event => {
		event.preventDefault()
	});

	// Reset widget if the track finishes
	player.bind(SC.Widget.Events.FINISH, () => {
		track.children[2].children[1].src = "/icons/Play.svg"
		player.seekTo(0)
	})

	function updateProgressBar() {
		player.getPosition(position => {
			track.children[2].children[3].style.width = (100*position/duration).toString() + "%"
		})
		player.isPaused(paused => {
			if (!paused) window.requestAnimationFrame(updateProgressBar)
		})
	}

}
