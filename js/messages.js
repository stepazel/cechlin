async function loadMessages() {
	const messagesSection = document.getElementById('messages')

	try {
		const response = await fetch("https://cechhlin.cz/api/messages", {
		// const response = await fetch("http://localhost:8080/messages", {
			method: "GET",
		})
		const messages = await response.json()

		return messages.forEach(message => {
			const date = new Date(message.date_created);
			const dateString = `${date.getDate()}. ${date.getMonth()}. ${date.getFullYear()} v ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
			messagesSection.innerHTML += `
                <div>
                    <h3>${message.name} | <span class="datum">${dateString}</span></h3>
                    <p>${message.message}</p>
                </div>`
		})
	} catch (e) {
		messagesSection.innerHTML = "<p>Chyba při načítání zpráv.</p>";
		console.error(e);
	}
}


loadMessages();


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