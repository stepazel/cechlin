function toggleNav() {
	const nav = document.getElementById("mobile-nav");
	nav.style.width === "100%" ? nav.style.width = "0" : nav.style.width = "100%";
}

const form = document.getElementById("message-form");

form.addEventListener("submit", async (event) => {
	event.preventDefault();
	const formData = new FormData(form);

	try {
		await fetch("https://cechhlin.cz/api/message", {
			method: "POST",
			body: new URLSearchParams({
				name: formData.get('name'),
				message: formData.get('message'),
			})
		});
		form.reset();
		window.location.reload();
	} catch (e) {
		alert("Chyba při odesílání zprávy. Kontaktujte správce");
		console.error(e);
	}
});


