import express from 'express';
import auth from './routes/auth.js';
import books from './routes/books.js';
import login from './routes/login.js';
import cors from 'cors';

const app = express();

//Define a CORS configuration that allows requests only from http://localhost:5173
const corsOptions = {
  origin: 'http://localhost:5173',
};

//Use the custom CORS configuration
app.use(cors(corsOptions));


const port = 3000;

app.use(express.json());


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
