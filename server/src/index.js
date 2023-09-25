import express from 'express';
import bcrypt from 'bcrypt';
import auth from './routes/auth.js';

const app = express()
const port = 3000

app.use("/auth", auth);


app.get('/', (req, res) => {
  console.log(req);
  // res.send('Hello World!')
  res.json({ msg: "hello world"});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// Example user data
const users = [
  {
    username: 'user1',
    password: 'password123',
  },

];

let saltRounds = 10;

users.forEach(async (user) => {
  user.password = await bcrypt.hash(user.password, saltRounds, function (err, hash) {

  });
});

/*

  bcrypt.compare(password, hash, function(err, result) {
  // result === true or false
  });

  // Authorization middleware
  function checkAuthorization(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    // Continue to the next middleware or route
    next();
  }

  // Validation middleware
  async function validateCredentials(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    const [username, password] = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const user = users.find((u) => u.username === username);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Username and password are correct; continue to the protected route
    next();
  }

*/