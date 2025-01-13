function galleryElement() {
    // Kontrollera om koden körs i webbläsaren
    if (typeof window !== 'undefined') {

        // Hämta JSON-filen
        fetch('./js/homePage.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to load JSON: ${response.status}`);
                }
                return response.json(); // Konvertera till JSON
            })
            .then((pictureData) => {
                // Hämta sektionen där bilderna ska visas
                const HeroImgSection = document.getElementsByClassName('hero_IMG')[0];
                const NaHeroImg = document.getElementById('NaHeroImg');

                if (!HeroImgSection) {
                    throw new Error('Element with ClassName "hero_IMG" not found.');
                }
                if (!NaHeroImg) {
                    throw new Error('Element with ID "NaHeroImg" not found.');
                }

                // Rensa sektionen innan rendering
                HeroImgSection.innerHTML = '';
                NaHeroImg.innerHTML = '';

                // Loopa igenom JSON-data och skapa element
                pictureData.forEach((picture) => {
                    const img = document.createElement('img');
                    img.className = "wallpaper";
                    img.src = picture.src;
                    img.alt = picture.title;
                    img.style.width = "100%";

                    const imgH = document.createElement('h1');
                    imgH.className = 'H1Name';
                    imgH.textContent = picture.title;

                    // Lägg till bild och rubrik i boxen
                    HeroImgSection.appendChild(img);
                    NaHeroImg.appendChild(imgH);
                });
            })
            .catch((error) => {
                console.error('Error rendering pictures:', error);
            });

    } else {
        console.error('This script is designed to run in the browser, not Node.js.');
    }
}

var myIndex = 0;
carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("wallpaper");

    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) { myIndex = 1 }
    x[myIndex - 1].style.display = "block";
    setTimeout(carousel, 10000); // Change image every 5 seconds
}