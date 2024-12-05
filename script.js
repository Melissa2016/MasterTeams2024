// Function to handle dropdown selection and update book content
document.getElementById('book-set-selector').addEventListener('change', function() {
    let bookSet = this.value;
    let bookContent = document.getElementById('book-content');

    // Clear previous content
    bookContent.innerHTML = '';
//
    // Define content for each book set
    const bookSets = {
        set1: `
        <h3>Set 1</h3>
        <ul>
            <li>The pin is in the pit.</li>
            <li>The pet is in the pit.</li>
            <li>The zip is on the zip.</li>
            <li>Red pins are in the pit!</li>
            <li>Take your time reading each sentence.</li>
        </ul>
    `,
    set2: `
        <h3>Set 2</h3>
        <ul>
            <li>The rat is in the trap.</li>
            <li>She can see a red pit.</li>
            <li>The tent is not on top of the pile.</li>
            <li>The cat is on the mat.</li>
        </ul>
    `,
    // More sets can be added here
    };

    // Update content based on selected book set
    if (bookSets[bookSet]) {
        bookContent.innerHTML = `<p>${bookSets[bookSet]}</p>`;
    } else {
        bookContent.innerHTML = `<p>Please select a valid book set.</p>`;
    }
});
