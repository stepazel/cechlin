async function loadMessages() {
    try {
        const response = await fetch("https://cechhlin.cz/api/messages", {
            method: "GET",
        }).then(function (response) {
            return response.json();
        }).then(function (messages) {
            const messagesSection = document.getElementById('messages');
            messages.forEach(message => {
                const date = new Date(message.date_created);
                const dateString = `${date.getDate()}. ${date.getMonth()}. ${date.getFullYear()} v ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                messagesSection.innerHTML += `
                <div>
                    <h3>${message.name} | <span class="datum">${dateString}</span></h3>
                    <p>${message.message}</p>
                </div>`
            });
        });
    } catch (e) {
        console.error(e);
    }
}


loadMessages();