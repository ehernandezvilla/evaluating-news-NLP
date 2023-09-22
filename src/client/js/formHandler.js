function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('text').value;

    // Validate that the input is not empty
    if (!formText.trim()) {
        alert('The input field cannot be blank.');
        return false;
    }

    Client.checkForName(formText) // Check input text

    console.log("Form Submitted")

    const apiEndpoint = `http://localhost:8081/sentiment`;

    fetch(apiEndpoint, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({text: formText}) // Include the form variables 
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        // Extract relevant information from the API response
        const polarity = data.score_tag === "P" ? "Positive" : (data.score_tag === "P+" ? "Extra Positive" : (data.score_tag === "NONE" ? "None" : "Negative"));
        const subjectivity = data.subjectivity;
        const textSnippet = data.sentence_list[0].text;
        const irony = data.irony;
        document.getElementById('results').innerHTML = `
        <p><strong>Polarity:</strong> ${polarity}</p>
        <p><strong>Subjectivity:</strong> ${subjectivity}</p>
        <p><strong>Text Snippet:</strong> ${textSnippet}</p>
        <p><strong>Irony:</strong> ${irony}</p>
    `;
})
.catch(error => {
    console.error(`Could not get data: ${error}`);
});
}

export { handleSubmit }
