import express from 'express';
import auth from './routes/auth.js';
import books from './routes/books.js';
import login from './routes/login.js';

const app = express()
const port = 3000;

app.use("/auth", auth);
app.use("/books", books);
app.use("/login", login);


app.get('/', (req, res) => {
  console.log(req);
  res.json({ msg: "hello world"});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
