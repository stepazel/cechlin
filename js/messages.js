async function loadMessages() {
	const messagesSection = document.getElementById('messages')

	try {
		const response = await fetch("https://cechhlin.cz/api/messages", {
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


await loadMessages();