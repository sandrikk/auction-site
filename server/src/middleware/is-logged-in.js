import bcrypt from "bcrypt";
import fs from "fs";

// Read the users.json file
const usersFilePath = 'src/json/users.json';
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

const isLoggedIn = (req, res, next) => {
    const { email, password } = req.body;

    // Find the user with the provided email
    const user = users.find((user) => user.email === email);

    if (!user) {
        return res.status(401).send('User not found');
    }

    if (bcrypt.compare(password, user.password, function(err, result) {})) {
        next();
    } else {
        res.status(401).send('You are not logged in!');
    }

};

export default isLoggedIn;
