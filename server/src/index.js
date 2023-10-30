import express from 'express';
import bookRouter from './routers/bookRouter.js';
import userRouter from './routers/userRouter.js';
import tokenRouter from './routers/tokenRouter.js';
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


app.use("/books", bookRouter);
app.use("/users", userRouter);
app.use("/tokens", tokenRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
