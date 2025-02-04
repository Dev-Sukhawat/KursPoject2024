function movieElement() {
    // Kontrollera om koden körs i webbläsaren
    if (typeof window !== 'undefined') {
        // console.log('Running in the browser:', typeof window);
        fetch('./js/movieGallery.json') // Hämta JSON-filen
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to load JSON: ${response.status}`);
                }
                return response.json(); // Konvertera till JSON
            })
            .then((movieCreator) => {
                const movieSection = document.getElementById('moviesCategory'); // Hämta sektionen
                if (!movieSection) {
                    throw new Error('Element with ID "moviesCategory" not found.');
                }
                movieSection.innerHTML = ''; // Rensa innehållet

                // Funktion för att visa filmer
                movieCreator.forEach((movie) => {
                    const moviesBox = document.createElement('div');
                    moviesBox.className = 'moviesBox';

                    const img = document.createElement('img');
                    img.src = movie.src;
                    img.alt = movie.title;
                    img.loading = 'lazy';

                    const moviesText = document.createElement('div');
                    moviesText.className = 'moviesText';

                    const header = document.createElement('h1');
                    header.textContent = movie.title;

                    const paragraph = document.createElement('p');
                    paragraph.textContent = movie.paragraph;

                    // Montera elementen
                    moviesText.appendChild(header);
                    moviesText.appendChild(paragraph);

                    moviesBox.appendChild(img);
                    moviesBox.appendChild(moviesText);

                    movieSection.appendChild(moviesBox);
                });
            })
            .catch((error) => {
                console.error('Error fetching and parsing JSON:', error);
            });
    } else {
        console.error('This script is designed to run in the browser, not Node.js.');
    }
}

movieElement()

