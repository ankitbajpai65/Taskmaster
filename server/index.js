const express = require('express');
const cors = require('cors');
const connectDb = require('./connection');
const userRouter = require('./routes/user');
const todoRouter = require('./routes/todo');
const dotenv = require('dotenv');

dotenv.config();

// CONNECTION
// connectDb('mongodb://127.0.0.1:27017/Taskmaster')
const databaseURL = process.env.DATABASE;
connectDb(databaseURL);

// MIDDLEWARES
const app = express();
app.use(express.json());
app.use(cors());

// ROUTES
app.use('/user', userRouter);
app.use('/todo', todoRouter);

const port = process.env.PORT || 4200;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});