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
  { title: "Tim Sat", img: "images/tim-sat.jpg", pdf: "pdfFiles/tim-sat.pdf", ppt: "pdfFiles/tim-sat.pptx" },
  { title: "The Pin is in the Pit", img: "images/pin-pit.jpg", pdf: "pin-pit.pdf", ppt: "pin-pit.ppt" },
];
document.getElementById("set-1-category").addEventListener("click", () => toggleBookSet(1, booksSet1));

const booksSet2 = [
  { title: "Book 2A", img: "images/book-2a.jpg", pdf: "book-2a.pdf", ppt: "book-2a.ppt" },
  { title: "Book 2B", img: "images/book-2b.jpg", pdf: "book-2b.pdf", ppt: "book-2b.ppt" },
];
document.getElementById("set-2-category").addEventListener("click", () => toggleBookSet(2, booksSet2));

const booksSet3 = [
  { title: "Book 3A", img: "images/book-3a.jpg", pdf: "book-3a.pdf", ppt: "book-3a.ppt" },
  { title: "Book 3B", img: "images/book-3b.jpg", pdf: "book-3b.pdf", ppt: "book-3b.ppt" },
];
document.getElementById("set-3-category").addEventListener("click", () => toggleBookSet(3, booksSet3));
window.open(pdfFile, '_blank', 'width=1200, height=800');

//Contact Us Page
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

