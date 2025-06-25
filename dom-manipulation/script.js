// Array of quote objects with text and category
let quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "To be, or not to be, that is the question.", category: "Philosophy" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Motivation" },
];

// Get references to DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const categoryFilter = document.getElementById('categoryFilter');
const addQuoteBtn = document.getElementById('addQuoteBtn');
const newQuoteTextInput = document.getElementById('newQuoteText');
const newQuoteCategoryInput = document.getElementById('newQuoteCategory');

// Function to update category dropdown options dynamically
function updateCategoryOptions() {
  // Get unique categories from quotes
  const categories = Array.from(new Set(quotes.map(q => q.category)));
  
  // Clear existing options except 'All'
  categoryFilter.innerHTML = '<option value="all">All</option>';
  
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Function to show a random quote (filtered by category if selected)
function showRandomQuote() {
  const selectedCategory = categoryFilter.value;
  
  // Filter quotes based on category, or use all if 'all'
  const filteredQuotes = selectedCategory === 'all' 
    ? quotes 
    : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = 'No quotes available for this category.';
    return;
  }
  
  // Pick random quote
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  
  quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
}

// Function to add a new quote from form input
function addQuote() {
  const text = newQuoteTextInput.value.trim();
  const category = newQuoteCategoryInput.value.trim();
  
  if (!text || !category) {
    alert('Please enter both a quote and a category.');
    return;
  }
  
  // Add new quote object to quotes array
  quotes.push({ text, category });
  
  // Clear inputs
  newQuoteTextInput.value = '';
  newQuoteCategoryInput.value = '';
  
  // Update category options in dropdown
  updateCategoryOptions();
  
  alert('Quote added successfully!');
}

// Event Listeners
newQuoteBtn.addEventListener('click', showRandomQuote);
addQuoteBtn.addEventListener('click', addQuote);
categoryFilter.addEventListener('change', showRandomQuote);

// Initialize
updateCategoryOptions();
