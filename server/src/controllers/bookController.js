import fs from "fs";
const booksFilePath = 'src/json/books.json';


export function getAllBooks(req, res) {
    // Read the contents of the books.json file
    fs.readFile(booksFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading books.json:', err);
            res.status(500).send('Error reading books.json');
            return;
        }

        // Parse the JSON data
        const books = JSON.parse(data);

        // Extract the category query parameter from the URL
        const {category, language, cover} = req.query;

        let filteredBooks = books;

        if (category) {
            // If a category is provided, filter the books by category
            filteredBooks = filteredBooks.filter(book => book.category === category);
        }

        if (language) {
            filteredBooks = filteredBooks.filter(book => book.language === language);
        }

        if (cover) {
            filteredBooks = filteredBooks.filter(book => book.cover === cover);
        }

        return res.json(filteredBooks);
    });
}


export function getBookByIsbn(req, res) {
    const isbn = Number(req.params.isbn);
    console.log('ISBN from URL:', isbn);

    // Read the contents of the books.json file
    fs.readFile(booksFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading books.json:', err);
            res.status(500).send('Error reading books.json');
            return;
        }

        try {
            // Parse the JSON data into an array of books
            const books = JSON.parse(data);

            console.log('All books:', books);

            // Find the book with the matching ISBN
            const foundBook = books.find((book) => book.isbn === isbn);

            if (foundBook) {
                // Send the found book as a response
                res.json(foundBook);
            } else {
                // Book not found
                res.status(404).send('Book not found');
            }
        } catch (parseError) {
            console.error('Error parsing books.json:', parseError);
            res.status(500).send('Error parsing books.json');
        }
    });
}

export function getBooksByCategory(req, res) {
    const {category} = req.query;

    // Read the contents of the books.json file
    fs.readFile(booksFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading books.json:', err);
            res.status(500).send('Error reading books.json');
            return;
        }

        try {
            // Parse the JSON data into an array of books
            const books = JSON.parse(data);

            // Filter books by the specified category
            const filteredBooks = books.filter((book) => book.category === category);

            // Send the filtered books as a response
            res.json(filteredBooks);
        } catch (parseError) {
            console.error('Error parsing books.json:', parseError);
            res.status(500).send('Error parsing books.json');
        }
    });
}

