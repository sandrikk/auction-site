import express from 'express';
import fs from 'fs';
import validator from 'validator';
import bcrypt from 'bcrypt';

const router = express.Router();
const usersFilePath = 'src/json/users.json';
const saltRounds = 12;

router.post('', async (req, res) => {
    const { email, password } = req.body;

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

        //Store the user
        const user = { email, password: hashedPassword };
        users.push(user);
        writeUsersFile(users);

        //Return 201 message: User + user.email + registered successfully
        res.status(201).json({ message: 'User ' + user.email + ' registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('', (req, res) => {
    //Read the users.json file and send the users as the response
    const users = readUsersFile();
    res.status(200).json(users);
});

function validateEmail(email) {
    return validator.isEmail(email);
}

function validatePassword(password) {
    return validator.isLength(password, { min: 5 });
}

function readUsersFile() {
    return JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
}

function writeUsersFile(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
}

export default router;
