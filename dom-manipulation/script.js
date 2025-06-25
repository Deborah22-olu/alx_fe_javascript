// Quotes array with objects containing text and category
const quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "To be, or not to be, that is the question.", category: "Philosophy" },
];




// Function to display a random quote and update the DOM using innerHTML
function showRandomQuote() {
  // same code as before
  if (quotes.length === 0) {
    document.getElementById('quoteDisplay').innerHTML = 'No quotes available.';
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" &mdash; <strong>${quote.category}</strong>`;
}


// Function to add a new quote to the quotes array and update the DOM
function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();

  if (!text || !category) {
    alert('Please enter both a quote and a category.');
    return;
  }

  quotes.push({ text, category });

  // Clear input fields
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';

  alert('Quote added successfully!');

  // Optionally show the newly added quote right away
  displayRandomQuote();
}

// Event listener on the “Show New Quote” button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);


// Event listener on the Add Quote button
document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
