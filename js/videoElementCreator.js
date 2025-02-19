function videoElement() {
    // Kontrollera om koden körs i webbläsaren
    if (typeof window !== 'undefined') {
        // Hämta JSON-filen
        fetch('../js/videoGallery.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to load JSON: ${response.status}`);
                }
                return response.json();
            })
            .then((videoData) => {
                // Hämta sektionen där bilderna ska visas
                const videoSection = document.getElementById('videoCategory')
                if (!videoSection) {
                    throw new Error(`Element with ID "videoCategory" not found`);
                }

                videoSection.innerHTML = ''; // Rensa sektionen innan rendering

                // Loopa igenom JSON-data och skapa element
                videoData.forEach((video) => {
                    const boxVideo = document.createElement('div');
                    boxVideo.classList.add("boxVideo");

                    const videoElemnt = document.createElement('video');
                    videoElemnt.classList.add("video");
                    videoElemnt.src = video.src;
                    videoElemnt.alt = video.title;
                    // videoElemnt.autoplay = false;

                    const imgH = document.createElement('h1');
                    imgH.classList.add("imgH");
                    let textVideoTitle = video.title
                        .split('-')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');


                    imgH.textContent = textVideoTitle;

                    boxVideo.appendChild(videoElemnt);
                    boxVideo.appendChild(imgH);

                    videoSection.appendChild(boxVideo);
                });

                const videoBox = document.querySelectorAll('.boxVideo');

                videoBox.forEach((box) => {
                    const videoElement = box.querySelector('.video');
                    const videoElementH = box.querySelector('.imgH')

                    box.onmouseover = function () {
                        videoElement.play(); // Spela upp videon
                        videoElement.muted = true; // Stäng av ljudet
                        videoElement.loop = true; // Loop-videon
                        videoElementH.style.opacity = '1'; // Göra att det syns
                        videoElement.style.filter = 'grayscale(0%)'; //Göra att det blir vanligt
                        box.style.transform = "scale(1.1,1.1)";
                    };

                    box.onmouseout = function () {
                        videoElement.pause(); // Pausa videon
                        videoElement.currentTime; // returnerar det aktuella uppspelningsläget för videon i sekunder
                        videoElementH.style.opacity = '0'; // Göra att det inte syns
                        videoElement.style.filter = 'grayscale(100%)'; //Göra att det blir gråfärgade
                        box.style.transform = "scale(1,1)";
                    };
                });
            })
            .catch((error) => {
                console.error('Error fetching and parsing JSON:', error);
            });
    } else {
        console.error('This script is designed to run in the browser, not Node.js.');
    }


}
videoElement()