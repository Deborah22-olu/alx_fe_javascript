// 1. Check for existence of quotes array with objects containing text and category
const quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "To be, or not to be, that is the question.", category: "Philosophy" },
];

// 2. Check for the displayRandomQuote function (named showRandomQuote here)
function showRandomQuote() {
  // 3. Logic to select a random quote and update the DOM
  if (quotes.length === 0) {
    document.getElementById('quoteDisplay').textContent = 'No quotes available.';
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById('quoteDisplay').textContent = `"${quote.text}" — ${quote.category}`;
}

// 4. Check for the addQuote function
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');
  
  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  // 5. Validate inputs before adding
  if (!text || !category) {
    alert('Please enter both a quote and a category.');
    return;
  }

  // 6. Add the new quote to the quotes array and update the DOM
  quotes.push({ text, category });

  // Clear inputs
  textInput.value = '';
  categoryInput.value = '';

  alert('Quote added successfully!');

  // Optionally show the newly added quote immediately
  showRandomQuote();
}

// 7. Check for event listener on the “Show New Quote” button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Event listener for Add Quote button
document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
