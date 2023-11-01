import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import fs from 'fs';
const usersFilePath = 'src/json/users.json';


export function addToken(req, res) {
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
    const isAdmin = user.isAdmin;
    const username = user.username;

    if (!user) {
        return res.status(401).json({ error: 'User not found' });
    }

    //Verify passwords using bcrypt
    const passwordMatch = bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
    }

    //Create a JWT token
    const secret = 'fvsjbherbheirbrhvfvkcvnkgndhghdrjtfkyugfjdhtgrrsehtrdyufkylfkjrdthserashtrdjytkfuytjdrhsetrdfkuyjtdhrtscvkdvkcv';
    jwt.sign({ email, username, isAdmin }, secret, { algorithm: 'HS256' }, (err, token) => {
        if (err) {
            console.error('Error creating token:', err);
            return res.status(500).json({ error: 'Failed to create token' });
        }

        res.status(201)
            .header('Authorization', token)
            .json({ message: 'Token created successfully', token });
    });
}

function validateEmail(email) {
    return validator.isEmail(email);
}

function validatePassword(password) {
    return validator.isLength(password, { min: 5 });
}