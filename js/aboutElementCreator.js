function element() {
    if (typeof window !== 'undefined') {

        fetch('../js/aboutGallery.json')
        .then((response) =>{
            if (!response){
                throw new Error (`Failed to load JSON: ${response.status}`)
            }
            return response.json();
        })
        .then((aboutData) =>{
            const aboutSection = document.getElementById('aboutCategory');
            if (!aboutSection) {
                throw new Error('Element with ID "imgCategory" not found.')
            }

            aboutSection.innerHTML= '';

            aboutData.forEach(category => {
                const aboutbox = document.createElement('div');
                aboutbox.className = 'box';

                const img = document.createElement('img');
                img.src = category.src;

                const textBox = document.createElement('div');
                textBox.className = 'textBox';

                const title = document.createElement('h2');
                title.className = 'title';
                title.innerHTML = category.title;

                const paragraph = document.createElement('p');
                paragraph.className = 'paragraph';
                paragraph.innerHTML = category.paragraph;

                textBox.appendChild(title)
                textBox.appendChild(paragraph)

                aboutbox.appendChild(img)
                aboutbox.appendChild(textBox)

                aboutSection.appendChild(aboutbox)
            });
        })
        .catch((error) => {
            console.error('Error fetching and parsing JSON:', error);
        });
    } else {
        console.error('This script is designed to run in the browser, not Node.js.');
    }
}

element()