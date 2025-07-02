document.addEventListener("DOMContentLoaded", function() {
    generateQuote();
    displayQuote();
});
function generateQuote(){
    const button = document.getElementById("newQuoteButton");
    button.addEventListener("click", function() {
        displayQuote();
    });
}
function displayQuote(){
    console.log("Fetching quote...");
    fetch('https://dummyjson.com/quotes/random')
    .then(response => response.json())
    .then(data => {
        const quoteText = document.getElementById("quoteText");
        const quoteAuthor = document.getElementById("quoteAuthor");
        quoteText.textContent = `"${data.quote}"`;
        quoteAuthor.textContent = `- ${data.author}`;
    })
    .catch(error => {
        console.error('Error fetching quote:', error);
        const quoteText = document.getElementById("quoteText");
        const quoteAuthor = document.getElementById("quoteAuthor");
        quoteText.textContent = "Failed to load quote.";
        quoteAuthor.textContent = "";
    });
}