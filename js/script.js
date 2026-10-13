function toggleNav() {
	const nav = document.getElementById("mobile-nav");
	nav.style.width === "100%" ? nav.style.width = "0" : nav.style.width = "100%";
}

const form = document.getElementById("message-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("hmm");
  handleSubmit();
});

async function handleSubmit(event) {
	const formData = new FormData(form);

	console.log(formData);
	try {
		const response = await fetch("https://cechhlin.cz/api/message", {
			method: "POST",
			body: new URLSearchParams({
				name: formData.get('name'),
				message: formData.get('message'),
			}),
		});
	} catch(e) {
		console.error(e);
	}
}

function getMessages() {
	return 
}

