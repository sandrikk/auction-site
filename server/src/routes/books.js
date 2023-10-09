import express from 'express';
import fs from 'fs';
const router = express.Router();

const booksFilePath = 'src/json/books.json';

router.get('', (req, res) => {

    //Read the contents of the books.json file
    fs.readFile(booksFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading books.json:', err);
            res.status(500).send('Error reading books.json');
            return;
        }

        //Parse the JSON data
        const books = JSON.parse(data);

        //Send the books data as a response
        res.json(books);
    });

});

router.get('/:id', (req, res) => {

    //Read the contents of the books.json file
    fs.readFile(booksFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading books.json:', err);
            res.status(500).send('Error reading books.json');
            return;
        }

        //Parse the JSON data
        const book = JSON.parse(data);

        //Send the books data as a response
        res.json(book);
    });

});

export default router;
