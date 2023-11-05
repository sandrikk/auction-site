import fs from "fs";
const booksFilePath = 'src/json/books.json';

export async function getAllBooks(req, res) {
    try {
        const books = await readBooksFile();
        const {category, language, cover} = req.query;

        let filteredBooks = books;
        if (category) {
            filteredBooks = filteredBooks.filter(book => book.category === category);
        }
        if (language) {
            filteredBooks = filteredBooks.filter(book => book.language === language);
        }
        if (cover) {
            filteredBooks = filteredBooks.filter(book => book.cover === cover);
        }

        res.status(200).json(filteredBooks);
    } catch (error) {
        res.status(500).send('Error processing the request.');
    }
}

export async function getBookByIsbn(req, res) {
    const isbn = Number(req.params.isbn);

    try {
        const foundBook = await findBookByIsbn(isbn);
        if (foundBook) {
            res.status(200).json(foundBook);
        } else {
            res.status(404).send('Book not found');
        }
    } catch (error) {
        res.status(500).send('Error processing the request');
    }
}

export async function getAllBidsForBook(req, res) {
    const isbn = Number(req.params.isbn);
    try {
        const book = await findBookByIsbn(isbn);
        if (book) {
            const bids = book.bids;
            res.status(200).json(bids);
        } else {
            res.status(404).send('Book not found');
        }
    } catch (error) {
        res.status(500).send('Error processing the request');
    }
}

export async function placeBid(req, res) {
    const isbn = Number(req.params.isbn);
    const { amount } = req.body;
    const bidAmount = parseFloat(amount);

    try {
        const books = await readBooksFile();

        const foundBook = books.find((book) => book.isbn === isbn);

        if (!foundBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Date validations
        const now = new Date();
        const startTime = new Date(foundBook.startTime);
        const endTime = new Date(foundBook.endTime);

        if (now < startTime || now > endTime) {
            return res.status(400).json({ error: 'Auction is not active' });
        }

        // Amount validations
        if (isNaN(bidAmount) || bidAmount <= 0) {
            return res.status(400).json({ error: 'Invalid bid amount' });
        }

        if (foundBook.bids) {
            const highestBid = Math.max(...foundBook.bids.map((bid) => bid.amount));
            if (bidAmount <= highestBid) {
                return res.status(400).json({ error: 'Bid must be higher than the current highest bid' });
            }
        }

        const newBid = {
            id: foundBook.bids ? foundBook.bids.length + 1 : 1,
            username: req.user.username,
            amount: bidAmount,
            date: formatDate(new Date()),
        };

        if (!foundBook.bids) {
            foundBook.bids = [newBid];
        } else {
            foundBook.bids.push(newBid);
        }

        await writeToBooksFile(books);

        res.status(201).json({ message: 'Bid placed successfully', bid: newBid });
    } catch (error) {
        console.error('Error in placeBid:', error);
        res.status(500).send('Error processing the request');
    }
}

export async function addBook(req, res) {
    const bookData = req.body;

    try {
        const existingBook = await findBookByIsbn(bookData.isbn);

        // Check if a book with the same ISBN already exists
        if (existingBook) {
            return res.status(400).send('A book with the same ISBN already exists.');
        }

        // Number of pages validation
        if (bookData.numberOfPages <= 0 || !Number.isInteger(bookData.numberOfPages)) {
            return res.status(400).send('Invalid number of pages.');
        }

        // Date validations
        const releaseDate = new Date(bookData.releaseDate);
        const startTime = new Date(bookData.startTime);
        const endTime = new Date(bookData.endTime);
        if (isNaN(releaseDate) || isNaN(startTime) || isNaN(endTime)) {
            return res.status(400).send('Invalid date format provided.');
        }
        if (startTime >= endTime) {
            return res.status(400).send('Start time should be before end time.');
        }

        // Validate specific string fields to ensure they are non-empty strings
        const stringFields = ['title', 'author', 'category', 'language', 'cover', 'publisher'];
        for (let field of stringFields) {
            if (!bookData[field] || typeof bookData[field] !== 'string' || bookData[field].trim() === '') {
                return res.status(400).send(`Field "${field}" must be a non-empty string.`);
            }
        }
        bookData.bids = [];

        const books = await readBooksFile();
        books.push(bookData);
        await writeToBooksFile(books);

        return res.status(201).json(bookData);
    } catch (error) {
        res.status(500).send('Error processing the request');
    }

}

export async function modifyBook(req, res) {
    const bookData = req.body;
    const isbn = Number(req.params.isbn);

    try {
        const existingBook = await findBookByIsbn(isbn);

        // Check if the book does not exist
        if (!existingBook) {
            return res.status(404).send('Book with the specified ISBN not found.');
        }

        // Number of pages validation
        if (bookData.numberOfPages <= 0 || !Number.isInteger(bookData.numberOfPages)) {
            return res.status(400).send('Invalid number of pages.');
        }

        // Date validations
        const releaseDate = new Date(bookData.releaseDate);
        const startTime = new Date(bookData.startTime);
        const endTime = new Date(bookData.endTime);
        if (isNaN(releaseDate) || isNaN(startTime) || isNaN(endTime)) {
            return res.status(400).send('Invalid date format provided.');
        }
        if (startTime >= endTime) {
            return res.status(400).send('Start time should be before end time.');
        }

        // Validate specific string fields to ensure they are non-empty strings
        const stringFields = ['title', 'author', 'category', 'language', 'cover', 'publisher'];
        for (let field of stringFields) {
            if (!bookData[field] || typeof bookData[field] !== 'string' || bookData[field].trim() === '') {
                return res.status(400).send(`Field "${field}" must be a non-empty string.`);
            }
        }

        const books = await readBooksFile();
        const bookIndex = books.findIndex(book => book.isbn === isbn);

        if (bookIndex === -1) {
            return res.status(404).send('Book with the specified ISBN not found in the list.');
        }

        books[bookIndex] = bookData;  // Update the book data
        await writeToBooksFile(books);

        return res.status(200).json(books[bookIndex]);
    } catch (error) {
        res.status(500).send('Error processing the request');
    }
}


export async function deleteBook(req, res) {
    const isbn = Number(req.params.isbn);

    try {
        const existingBook = await findBookByIsbn(isbn);

        // Check if the book exists
        if (!existingBook) {
            return res.status(404).send('Book with the specified ISBN not found.');
        }

        const books = await readBooksFile();
        const bookIndex = books.findIndex(book => book.isbn === isbn);
        if (bookIndex !== -1) {
            books.splice(bookIndex, 1);
        }
        await writeToBooksFile(books);

        res.status(200).send('Book deleted successfully.');
    } catch (error) {
        res.status(500).send('Error processing the request');
    }
}



// Helper function to format date to be readable
function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

// Helper function to read books
async function readBooksFile() {
    const data = await fs.promises.readFile(booksFilePath, 'utf8');
    return JSON.parse(data);
}

// Helper function to write to books
async function writeToBooksFile(books) {
    await fs.promises.writeFile(booksFilePath, JSON.stringify(books, null, 2), 'utf8');
}

// Helper function to retrieve a book by its isbn
async function findBookByIsbn(isbn) {
    const data = await readBooksFile();
    return data.find((book) => book.isbn === isbn);
}