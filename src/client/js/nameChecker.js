function checkForName(inputText) {
    console.log("Running checkForName", inputText);
    let names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou"
    ]

    if(names.includes(inputText)) {
        alert("¡Great! We are processing your request!")
    } 
};

export { checkForName }
