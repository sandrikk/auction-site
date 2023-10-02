import bcrypt from 'bcrypt';
import fs from 'fs';

// Sample user data with plain passwords
const users = [
    {
        email: 'user1@example.com',
        password: 'password1',
    },
    {
        email: 'user2@example.com',
        password: 'password2',
    },
    {
        email: 'user3@example.com',
        password: 'password3',
    },
];

//Hash and replace plain passwords with hashed passwords
const saltRounds = 12; // You can adjust the number of salt rounds
const hashedUsers = users.map((user) => {
    const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
    return {
        email: user.email,
        password: hashedPassword,
    };
});

// Write the hashed users to users.json
fs.writeFileSync('./src/json/users.json', JSON.stringify(hashedUsers, null, 2));

console.log('Hashed passwords and saved to users.json');
