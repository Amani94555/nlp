import { checkForName } from "./nameChecker"; 
import { urlChecker } from './urlChecker';

function handleSubmit(event) {
    event.preventDefault();

    const formText = document.getElementById('name').value; 

    if (urlChecker(formText)) {
        console.log("::: Valid URL Submitted :::");

        postData('http://localhost:8081/api', { url: formText })
            .then((data) => {

                document.getElementById('results').innerHTML = `
                    <p>Polarity: ${data.polarity}</p>
                    <p>Subjectivity: ${data.subjectivity}</p>
                    <p>Text Snippet: ${data.text}</p>
                `;
            })
            .catch((error) => {
                console.error('Error:', error); 
                alert('There was an issue with fetching data from the server.');
            });
    } else {
        alert('Please enter a valid URL.');
    }
}

async function postData(url = '', data = {}) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch sentiment analysis');
        }

        return await response.json(); 
    } catch (error) {
        console.error('Error in postData:', error); 
    }
}

export { handleSubmit };
