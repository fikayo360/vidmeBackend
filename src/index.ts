import express, { Express, Request, Response } from 'express';
const app: Express = express();
import dotenv from 'dotenv';
dotenv.config();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
const start =  () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();