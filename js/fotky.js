async function loadImages() {
	const gallery = document.getElementById("gallery");

	for (let i = 1; i <= 36; i++) {
		gallery.innerHTML += `
        <div class="image-container">
            <img src="fotky/${i}.png">
        </div>
        `;
	}
}

loadImages();
