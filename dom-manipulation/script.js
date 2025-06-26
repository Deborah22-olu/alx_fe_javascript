// Starting quotes (default)
let quotes = [
  "Be yourself; everyone else is already taken.",
  "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
  "So many books, so little time."
];

// Load quotes from localStorage if they exist
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    try {
      quotes = JSON.parse(storedQuotes);
    } catch (e) {
      console.error("Could not parse quotes from localStorage", e);
    }
  }
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Display a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }
  const index = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = quotes[index];

  // Save last viewed quote index to sessionStorage
  sessionStorage.setItem('lastQuoteIndex', index);
}

// Add a new quote from user input
function addNewQuote() {
  const newQuote = newQuoteText.value.trim();
  if (!newQuote) {
    alert("Please enter a quote.");
    return;
  }
  quotes.push(newQuote);
  saveQuotes();
  alert("Quote added!");
  newQuoteText.value = "";
}

// Export quotes as a JSON file
function exportQuotes() {
  const jsonStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

// Import quotes from a JSON file input
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
      } else {
        alert('Invalid JSON format: expected an array of quotes.');
      }
    } catch (error) {
      alert('Error parsing JSON file.');
      console.error(error);
    }
  };
  if(event.target.files.length > 0) {
    fileReader.readAsText(event.target.files[0]);
  }
}

// DOM Elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteBtn = document.getElementById('addQuoteBtn');
const newQuoteShowBtn = document.getElementById('newQuote');
const exportBtn = document.getElementById('exportBtn');
const importFileInput = document.getElementById('importFile');

// Initialization
loadQuotes();

// Show last viewed quote from sessionStorage or show random quote
const lastIndex = sessionStorage.getItem('lastQuoteIndex');
if (lastIndex !== null && quotes[lastIndex]) {
  quoteDisplay.textContent = quotes[lastIndex];
} else {
  showRandomQuote();
}

// Event Listeners
newQuoteShowBtn.addEventListener('click', showRandomQuote);
newQuoteBtn.addEventListener('click', addNewQuote);
exportBtn.addEventListener('click', exportQuotes);
importFileInput.addEventListener('change', importFromJsonFile);
