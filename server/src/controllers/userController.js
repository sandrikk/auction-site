import fs from "fs";
import validator from "validator";
import bcrypt from "bcrypt";
const usersFilePath = 'src/json/users.json';
const booksFilePath = 'src/json/books.json';
const saltRounds = 12;


export function getAllUsers (req, res) {
    //Read the contents of the books.json file
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading users.json:', err);
            res.status(500).send('Error reading users.json');
            return;
        }

        //Parse the JSON data
        const users = JSON.parse(data);

        //Send the books data as a response
        res.json(users);
    })
}

export async function addUser(req, res) {
    const { email, password } = req.body;

    // Check if email or password is not provided or is an empty string
    if (!email || !password || email.trim() === '' || password.trim() === '') {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // Extract username from email
    const username = email.split('@')[0];

    //Validate email and password
    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    if (!validatePassword(password)) {
        return res.status(400).json({ error: 'Password must be at least 5 characters long' });
    }

    //Check if the email is already in the file
    const users = readUsersFile();
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ error: 'Email is already registered' });
    }

    try {
        //Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //Generate an auto-incrementing ID
        const usersWithIds = users.map((user, index) => ({
            id: index + 1,
            ...user
        }));

        //Store the user
        const user = {
            id: usersWithIds.length + 1,
            username,
            email,
            password: hashedPassword,
            isAdmin: false
        };

        usersWithIds.push(user);
        writeUsersFile(usersWithIds);

        //Return a 201 message: User + user.email + registered successfully
        res.status(201).json({ message: 'User ' + user.email + ' registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function getWonAuctions(req, res) {
// Read the contents of the books.json file
    fs.readFile(booksFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading books.json:', err);
            res.status(500).send('Error reading books.json');
            return;
        }

        // Parse the JSON data
        const books = JSON.parse(data);

        const loggedInUser = req.user.username;


    // Filter books
    const wonBooks = books.filter(book => {
        const endTime = new Date(book.endTime);
        const now = new Date();

        if (now > endTime && book.bids && book.bids.length > 0) {
            // Check if the highest bid belongs to the logged-in user
            const highestBid = book.bids[book.bids.length - 1];  // Assuming bids are in ascending order
            return highestBid.username === loggedInUser;
        }

        return false;
    });

    res.status(200).json(wonBooks);
    });

}

export async function deleteUser(req, res) {
    const id = Number(req.params.id);

    // Read the current users from the file
    let users = readUsersFile();

    // Find the index of the user with the matching ID
    const userIndex = users.findIndex(user => user.id === id);

    // If the user does not exist, return a 404 (Not Found)
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Remove the user from the array
    users.splice(userIndex, 1);

    // Try to write the updated array back to the file
    try {
        writeUsersFile(users);
        // Respond with a success message
        res.status(200).json({ message: `User with ID ${userId} deleted successfully` });
    } catch (error) {
        // If an error occurs during file writing, respond with a server error
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


function readUsersFile() {
    return JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
}

function validateEmail(email) {
    return validator.isEmail(email);
}

function validatePassword(password) {
    return validator.isLength(password, { min: 5 });
}

function writeUsersFile(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
}