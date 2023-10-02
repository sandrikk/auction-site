// is-logged-in.js
import bcrypt from "bcrypt";
import fs from "fs";

// Read the users.json file
const usersFilePath = 'src/json/users.json';
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

const isLoggedIn = async (req, res, next) => {
    const { email, password } = req.body;

    const user = users.find((user) => user.email === email);

    if (!user) {
        return res.status(401).send({
            message: 'User not found',
            storedEmail: null,
            receivedEmail: email,
            storedPassword: null,
            receivedPassword: password,
        });
    }

    try {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            return res.status(200).send({
                message: 'Login successful',
                storedEmail: user.email,
                receivedEmail: email,
                storedPassword: user.password,
                receivedPassword: password,
            });
        }
    } catch (error) {
        console.error('Error comparing passwords:', error);
        return res.status(500).send('Internal Server Error');
    }

    // If passwords do not match
    return res.status(401).send({
        message: 'Incorrect password',
        storedEmail: user.email,
        receivedEmail: email,
        storedPassword: user.password,
        receivedPassword: password,
    });

};

export default isLoggedIn;



