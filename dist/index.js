var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// api nyckel
const API_URL = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";
// async funktion för hämta data från API med api nyckel
// lägger till Promise som typ med book-array
function fetchBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch books");
        }
        // förväntar mig att få en array tillbaka med Book interface egenskaperna
        const books = yield response.json();
        console.log(books); // loggar
        return books;
    });
}
// funktion för skapa och visa information om böckerna'
// förväntar mig att parameter books ska innehålla en array och sätter void på funktionen då funktionen ej returnerar något.
function displayBookList(books) {
    const container = document.getElementById("book-container"); // html element
    container.innerHTML = "";
    // kör forEach på books för att hämta egenskaper
    books.forEach((book) => {
        console.log(book); // loggar
        const bookDiv = document.createElement("div"); // skapar bookDiv
        bookDiv.className = "book-card"; // lägger till classname
        bookDiv.style.background = book.color; // tar book.color egenskapen för sätta bg färg på bookDiv
        bookDiv.innerHTML = `
    <div class="book-line"></div>
      <h3>${book.title}</h3>
      <p>By: ${book.author}</p>
    `; // visar title och author på boookDiv
        bookDiv.addEventListener("click", () => {
            // lyssnar efter klick på bookDiv och kallar på funktion med book som parameter
            displayBookDetails(book);
        });
        container.appendChild(bookDiv); // lägger till den nyskapade diven på container
    });
}
// funktion för visa böckernas egenskaper som kommmer från API
// lägger till Book interface på parameter och använder void då funktion ej returnerar ett värde
function displayBookDetails(book) {
    const container = document.getElementById("book-container"); // html element
    const searchDiv = document.querySelector(".search-div");
    container.innerHTML = ""; // tömmer container
    searchDiv.classList.add("hide");
    const detailsDiv = document.createElement("div"); // skapar detailsDiv
    detailsDiv.className = "book-details"; // lägger till classname
    detailsDiv.style.background = book.color; // sätter backgrund
    document.body.style.background = "#222222";
    detailsDiv.innerHTML = `
  <div class="book-line"></div>
  <div class="title-author">
  <h3 class="book-title">${book.title}</h3>
    <p class="book-author"><strong>By:</strong> ${book.author}</p>
    <p class="book-plot"><strong>Plot:</strong><br> ${book.plot}</p>
    <div class="book-info">
    <p class="book-audience"><strong>Audience:</strong> ${book.audience}</p>
    <p class="book-pages"><strong>Pages:</strong> ${book.pages}</p>
    <p class="book-publisher"><strong>Publisher:</strong> ${book.publisher}</p>
    <p class="book-year"><strong>Year:</strong> ${book.year}</p>
    </div>
  `; // visar egenskaper från API
    detailsDiv.addEventListener("click", () => {
        // lyssnar efter klick kallar på init()
        searchDiv.classList.remove("hide");
        init();
    });
    container.appendChild(detailsDiv); // lägger till detailsDiv till container
}
// funktion för söka efter böcker
function setupSearch(books) {
    const searchInput = document.getElementById("search-input"); // html element
    searchInput.addEventListener("input", () => {
        // lyssnar efter input
        const query = searchInput.value.toLowerCase(); // skapar query variabel och hämtar input värdet
        const filteredBooks = books.filter(
        // filtrerar böcker
        (book) => book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query));
        displayBookList(filteredBooks); // visar filtrerade böcker
    });
}
// init async funktion väntar sig ett promise och void används för funktionen ej returnerar ett värde
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const books = yield fetchBooks(); // förväntar mig att books är en array
            displayBookList(books); // kallar funktion med books
            setupSearch(books); // kallar funktion med books
        }
        catch (error) {
            console.error("Error:", error);
        }
    });
}
// kör scriptet när sidan laddas
init();
export {};
