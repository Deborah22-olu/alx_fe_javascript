// ==== Default Quotes ====
let quotes = [
  { text: "Be yourself; everyone else is already taken.", category: "Inspiration" },
  { text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", category: "Humor" },
  { text: "So many books, so little time.", category: "Books" }
];

// ==== DOM Elements ====
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
const newQuoteBtn = document.getElementById('addQuoteBtn');
const newQuoteShowBtn = document.getElementById('newQuote');
const exportBtn = document.getElementById('exportBtn');
const importFileInput = document.getElementById('importFile');
const categoryFilter = document.getElementById('categoryFilter');

// ==== Load Quotes from localStorage ====
function loadQuotes() {
  const stored = localStorage.getItem('quotes');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        quotes = parsed;
      }
    } catch (e) {
      console.error("Error parsing saved quotes", e);
    }
  }
}

// ==== Save Quotes to localStorage ====
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// ==== Populate Categories in Dropdown ====
function populateCategories() {
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
  uniqueCategories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore last selected filter
  const savedCategory = localStorage.getItem('selectedCategory');
  if (savedCategory) {
    categoryFilter.value = savedCategory;
    filterQuotes();
  }
}

// ==== Filter Quotes by Selected Category ====
function filterQuotes() {
  const selected = categoryFilter.value;
  localStorage.setItem('selectedCategory', selected);
  const filteredQuotes = selected === "all"
    ? quotes
    : quotes.filter(q => q.category === selected);

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes found in this category.";
  } else {
    const index = Math.floor(Math.random() * filteredQuotes.length);
    quoteDisplay.textContent = `${filteredQuotes[index].text} (${filteredQuotes[index].category})`;
  }
}

// ==== Show a Random Quote ====
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }
  const index = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = `${quotes[index].text} (${quotes[index].category})`;
  sessionStorage.setItem('lastQuoteIndex', index);
}

// ==== Add a New Quote ====
function addNewQuote() {
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();

  if (!text || !category) {
    alert("Please enter both a quote and category.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();
  populateCategories();
  filterQuotes();

  newQuoteText.value = "";
  newQuoteCategory.value = "";
  alert("Quote added!");
}

// ==== Export Quotes to JSON File ====
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

// ==== Import Quotes from JSON File ====
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        imported.forEach(item => {
          if (typeof item.text === "string" && typeof item.category === "string") {
            quotes.push(item);
          }
        });
        saveQuotes();
        populateCategories();
        filterQuotes();
        alert('Quotes imported successfully!');
      } else {
        alert('Invalid format. Expected an array of quote objects.');
      }
    } catch (error) {
      alert('Error reading JSON file.');
      console.error(error);
    }
  };
  if (event.target.files.length > 0) {
    fileReader.readAsText(event.target.files[0]);
  }
}

// ==== Initialization ====
loadQuotes();
populateCategories();

const lastIndex = sessionStorage.getItem('lastQuoteIndex');
if (lastIndex && quotes[lastIndex]) {
  quoteDisplay.textContent = `${quotes[lastIndex].text} (${quotes[lastIndex].category})`;
} else {
  showRandomQuote();
}

// ==== Event Listeners ====
newQuoteShowBtn.addEventListener('click', showRandomQuote);
newQuoteBtn.addEventListener('click', addNewQuote);
exportBtn.addEventListener('click', exportQuotes);
importFileInput.addEventListener('change', importFromJsonFile);
categoryFilter.addEventListener('change', filterQuotes);
