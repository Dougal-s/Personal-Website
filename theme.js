const toggleThemeBtn = document.getElementById("toggle-theme")
const themes = document.getElementsByClassName("theme")

toggleThemeBtn.addEventListener("mousedown", e => {e.preventDefault()})
toggleThemeBtn.addEventListener("click", e => {
	if (toggleThemeBtn.children[0].getAttribute("src") === "/icons/dark-theme.svg")
		toggleThemeBtn.children[0].src = "/icons/light-theme.svg"
	else
		toggleThemeBtn.children[0].src = "/icons/dark-theme.svg"

	for (const theme of themes)
		if (theme.getAttribute("href").endsWith("-dark.css"))
			theme.href = theme.getAttribute("href").replace("-dark.css", "-light.css")
		else
			theme.href = theme.getAttribute("href").replace("-light.css", "-dark.css")
})
