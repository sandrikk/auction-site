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

export function getAllBidsForBook(req, res) {
    // Use the getBookByIsbn function to retrieve the book
    getBookByIsbn(req, res, () => {
        // This function will be called once the book has been retrieved in getBookByIsbn
        const bids = res.locals.book.bids;
        res.json(bids);
    });
}

export function getBookByIsbn(req, res) {
    const isbn = Number(req.params.isbn);
    //console.log('ISBN from URL:', isbn);

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

            //console.log('All books:', books);

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

export async function placeBid(req, res) {
    const isbn = Number(req.params.isbn);
    const { amount } = req.body;

    try {
        const readFilePromise = new Promise((resolve, reject) => {
            fs.readFile(booksFilePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading books.json:', err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        const fileData = await readFilePromise;
        const books = JSON.parse(fileData);

        // Find the book with the matching ISBN
        const foundBook = books.find((book) => book.isbn === isbn);

        if (!foundBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Check if the auction is active
        const now = new Date();
        const startTime = new Date(foundBook.startTime);
        const endTime = new Date(foundBook.endTime);

        if (now < startTime || now > endTime) {
            return res.status(400).json({ error: 'Auction is not active' });
        }

        // Convert bid amount to a number
        const bidAmount = parseFloat(amount);

        if (isNaN(bidAmount) || bidAmount <= 0) {
            return res.status(400).json({ error: 'Invalid bid amount' + bidAmount});
        }

        if (foundBook.bids) {
            const highestBid = Math.max(...foundBook.bids.map((bid) => bid.amount));
            if (bidAmount <= highestBid) {
                return res.status(400).json({ error: 'Bid must be higher than the current highest bid' });
            }
        }

        // Create the bid object
        const newBid = {
            id: foundBook.bids ? foundBook.bids.length + 1 : 1,
            username: req.user.username,
            amount: bidAmount,
            date: formatDate(new Date()),  // Format the date here
        };

        console.log(req.user);

        // Add the bid to the book's bids array
        if (!foundBook.bids) {
            foundBook.bids = [newBid];
        } else {
            foundBook.bids.push(newBid);
        }

        fs.writeFile(booksFilePath, JSON.stringify(books, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing books.json:', err);
                res.status(500).json({ error: 'Error updating book data' });
            } else {
                res.status(201).json({ message: 'Bid placed successfully', bid: newBid });
            }
        });
        // Update the book in your data store
        // Ensure you save the changes back to the file, but this part is missing in your code

        res.status(201).json({ message: 'Bid placed successfully', bid: newBid });
    } catch (error) {
        console.error('Error in placeBid:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
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

function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // +1 because months are 0-based
    const year = date.getUTCFullYear();

    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}


