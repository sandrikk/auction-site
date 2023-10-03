import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import fs from 'fs';

const router = express.Router();
const usersFilePath = 'src/json/users.json';

router.post('', async (req, res) => {
    const { email, password } = req.body;

    //Validate email and password
    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    if (!validatePassword(password)) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    //Check if the user is registered
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
    const user = users.find((u) => u.email === email);

    if (!user) {
        return res.status(401).json({ error: 'User not found' });
    }

    //Verify passwords using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
    }

    // Create a JWT token
    const privateKey = 'default-secret';
    jwt.sign({ email }, privateKey, { algorithm: 'HS256' }, (err, token) => {
        if (err) {
            console.error('Error creating token:', err);
            return res.status(500).json({ error: 'Failed to create token' });
        }

        const bearerToken = `Bearer ${token}`;

        res.status(201)
            .header('Authorization', bearerToken)
            .json({ message: 'Token created successfully', token });
    });

});

function validateEmail(email) {
    return validator.isEmail(email);
}

function validatePassword(password) {
    return validator.isLength(password, { min: 5 });
}

export default router;
