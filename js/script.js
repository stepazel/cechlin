function toggleNav() {
	const nav = document.getElementById("mobile-nav");
	nav.style.width === "100%" ? (nav.style.width = "0") : (nav.style.width = "100%");
}

const num = Math.floor(Math.random() * 6) + 1;
const zvuk = new Audio(`../zvuky/${num}.mp3`);
let cekajiciOdkaz = null;

zvuk.addEventListener("ended", () => {
	if (cekajiciOdkaz) {
		const adresa = cekajiciOdkaz;
		cekajiciOdkaz = null;
		window.location.href = adresa;
	}
});

document.addEventListener("click", (event) => {
	const odkaz = event.target.closest("a[href]");
	if (!odkaz || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

	console.log(odkaz.hasAttribute("download"));
	{
		return;
	}
	event.preventDefault();
	cekajiciOdkaz = odkaz.href;

	zvuk.pause();
	zvuk.currentTime = 0;

	zvuk.play().catch(() => {
		const adresa = cekajiciOdkaz;
		cekajiciOdkaz = null;
		window.location.href = adresa;
	});
});
