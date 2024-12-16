function toggleBookSet(setNumber, books) {
  const bookSets = document.getElementById(`book-sets-${setNumber}`);
  const bookContent = document.getElementById(`book-content-${setNumber}`);

  // Clear previous content
  bookContent.innerHTML = "";

  // Create book items dynamically
  books.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");

    bookItem.innerHTML = `
      <img src="${book.img}" alt="${book.title}" class="book-cover">
      <h3>${book.title}</h3>

      <!-- PDF Viewer Embed (Initially Hidden) -->
      <div class="pdf-viewer" id="pdf-viewer-${book.title}" style="display:none;">
        <iframe src="${book.pdf}" width="600" height="400" frameborder="0">Your browser does not support PDF viewing.</iframe>
      </div>

      <!-- Download Buttons -->
      <div class="download-buttons">
        <a href="javascript:void(0);" class="btn pdf" onclick="showPDF('${book.pdf}')">
          <i class="fas fa-file-pdf"></i> View PDF
        </a>
        <a href="${book.ppt}" class="btn ppt" target="_blank">
          <i class="fas fa-file-powerpoint"></i> Download PPT
        </a>
      </div>
    `;

    bookContent.appendChild(bookItem);
  });

  // Toggle visibility
  bookSets.classList.toggle("hidden");
}

// Function to show the PDF in a new window
function showPDF(pdfFile) {
  // Open the PDF in a new window with fullscreen mode
  window.open(pdfFile, '_blank', 'fullscreen=yes, width=1200, height=800');
}

// Add event listeners for each set
const booksSet1 = [
  { title: "Set 1", img:"assets/Sets/Set1/cover-image set1.png", pdf: "assets/Sets/Set1/Set 1.pdf", ppt: "assets/Sets/Set1/Set 1.pptx"},

];
document.getElementById("set-1-category").addEventListener("click", () => toggleBookSet(1, booksSet1));

const booksSet2 = [
  { title: "Set 2", img: "images/book-2a.jpg", pdf: "book-2a.pdf", ppt: "book-2a.ppt" },

];
document.getElementById("set-2-category").addEventListener("click", () => toggleBookSet(2, booksSet2));

const booksSet3 = [
  { title: "Set 3", img: "assets/Sets/Set 3/Cover Image.png", pdf: "assets/Sets/Set 3/Set 3.pdf", ppt: "assets/Sets/Set 3/Set 3.pptx" },

];
document.getElementById("set-3-category").addEventListener("click", () => toggleBookSet(3, booksSet3));

const booksSet4 = [
  { title: "Set 4", img: "images/book-4a.jpg", pdf: "book-4a.pdf", ppt: "book-4a.ppt" },

];
document.getElementById("set-4-category").addEventListener("click", () => toggleBookSet(4, booksSet4));

const booksSet5 = [
  { title: "Set 5", img: "images/book-5a.jpg", pdf: "book-5a.pdf", ppt: "book-5a.ppt" },

];
document.getElementById("set-5-category").addEventListener("click", () => toggleBookSet(5, booksSet5));

const booksSet6 = [
  { title: "Set 6", img: "images/book-6a.jpg", pdf: "book-6a.pdf", ppt: "book-6a.ppt" },
  
];
document.getElementById("set-6-category").addEventListener("click", () => toggleBookSet(6, booksSet6));

const booksSet7 = [
  { title: "Set 7", img: "images/book-7a.jpg", pdf: "book-7a.pdf", ppt: "book-7a.ppt" },
  /*{ title: "Book 7B", img: "images/book-7b.jpg", pdf: "book-7b.pdf", ppt: "book-7b.ppt" },*/
];
document.getElementById("set-7-category").addEventListener("click", () => toggleBookSet(7, booksSet7));

// Contact Us Page
document.getElementById('contact-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Simple form validation
  if (name && email && message) {
    document.getElementById('response-message').innerText = 'Thank you for contacting us, ' + name + '!';
    this.reset();
  } else {
    document.getElementById('response-message').innerText = 'Please fill out all fields.';
  }
});
