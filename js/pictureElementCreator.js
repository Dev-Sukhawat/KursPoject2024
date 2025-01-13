function galleryElement() {
    // Kontrollera om koden körs i webbläsaren
    if (typeof window !== 'undefined') {

        // Hämta JSON-filen
        fetch('../js/pictureGallery.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to load JSON: ${response.status}`);
                }
                return response.json(); // Konvertera till JSON
            })
            .then((pictureData) => {
                // Hämta sektionen där bilderna ska visas
                const imgSection = document.getElementById('imgCategory');
                if (!imgSection) {
                    throw new Error('Element with ID "imgCategory" not found.');
                }

                imgSection.innerHTML = ''; // Rensa sektionen innan rendering

                // Loopa igenom JSON-data och skapa element
                pictureData.forEach((picture) => {
                    const boxImg = document.createElement('div');
                    boxImg.className = 'boxImg';

                    const img = document.createElement('img');
                    img.src = picture.src;
                    img.alt = picture.title;

                    const imgH = document.createElement('h1');
                    imgH.className = 'imgH';
                    imgH.textContent = picture.title;

                    // Lägg till bild och rubrik i boxen
                    boxImg.appendChild(img);
                    boxImg.appendChild(imgH);

                    // Lägg till boxen i sektionen
                    imgSection.appendChild(boxImg);
                });
            })
            .catch((error) => {
                console.error('Error fetching and parsing JSON:', error);
            });
    } else {
        console.error('This script is designed to run in the browser, not Node.js.');
    }
}
galleryElement()