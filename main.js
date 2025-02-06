// Kontrollera om vi är på index.html, och påverkar på phone size media
if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
    document.body.classList.add('index-page');

    if (window.location.hostname === "127.0.0.1") {
        galleryElement();
    } else {
        const baseURL = "/KursPoject2024"; // GitHub Pages: använd basen för projektet
        const imgPath = `${baseURL}/gallery/img/galactic-night-sky-astronomy-science-combined-generative-ai.jpg`;

        galleryElement(); // Skapar galleriet

        // Observera DOM-förändringar och vänta på att .wallpaper skapas
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                // console.log("Mutation observerade:", mutation);
            });

            const wallpaperElement = document.querySelector(".wallpaper");
            if (wallpaperElement) {
                wallpaperElement.src = imgPath;
                observer.disconnect(); // Stoppa observering
                // console.log("Elementet '.wallpaper' hittades och bildvägen har satts!");
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

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
                        img.classList.add("wallpaper")
                        img.src = picture.src;
                        img.alt = picture.title;
                        img.style.width = "100%";

                        const imgH = document.createElement('h1');
                        imgH.classList.add = 'H1Name';
                        imgH.className = 'H1Name';
                        imgH.textContent = picture.title;

                        // Lägg till bild och rubrik i boxen
                        HeroImgSection.appendChild(img);
                        NaHeroImg.appendChild(imgH);
                    });

                    let myIndex = 0;
                    heroImgSlider();
                    heroImgTextSlider()

                    function heroImgSlider() {
                        let i;
                        const imgCon = document.getElementsByClassName("hero_IMG")[0];
                        const x = imgCon.querySelectorAll("img");

                        for (i = 0; i < x.length; i++) {
                            x[i].style.display = "none";
                        }

                        if (myIndex === x.length) { myIndex = 0 }
                        x[myIndex].style.display = "block";
                        setTimeout(heroImgSlider, 5000); // Change image every 5 seconds
                    }

                    function heroImgTextSlider() {
                        let i;
                        const imgCon = document.getElementsByClassName("NaHeroImg")[0];
                        const x = imgCon.querySelectorAll("h1");

                        for (i = 0; i < x.length; i++) {
                            x[i].style.display = "none";
                        }

                        if (myIndex === x.length) { myIndex = 0 }
                        x[myIndex].style.display = "block";
                        setTimeout(heroImgTextSlider, 5000); // Change image every 5 seconds
                        myIndex++;
                        if (!myIndex % x.length) {
                            myIndex = 0;
                        }
                    }
                })
                .catch((error) => {
                    console.error('Error rendering pictures:', error);
                });

        } else {
            console.error('This script is designed to run in the browser, not Node.js.');
        }
    }

} else {
    document.body.classList.add('other-page');

    let myIndex = 0;
    carousel();

    function carousel() {
        let i;
        const x = document.getElementsByClassName("wallpaper");
        const v = document.getElementsByClassName("videoImg");

        if (x.length === 0) {
            video()
            function video() {
                for (i = 0; i < v.length; i++) {
                    v[i].style.display = "none";
                }
                myIndex++;
                if (myIndex > v.length) { myIndex = 1 }
                v[myIndex - 1].style.display = "block";
                setTimeout(carousel, 10000); // Change image every 10 seconds
            }
        }
        if (v.length === 0) {
            wallpaper()
            function wallpaper() {
                for (i = 0; i < x.length; i++) {
                    x[i].style.display = "none";
                }
                myIndex++;
                if (myIndex > x.length) { myIndex = 1 }
                x[myIndex - 1].style.display = "block";
                setTimeout(carousel, 5000); // Change image every 5 seconds

            }
        }

    }

}

