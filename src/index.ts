import express, { Express, Request, Response } from 'express';
const app: Express = express();
import dotenv from 'dotenv';
dotenv.config();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const {sequelizee} = require('../postgresconfig')

const port = process.env.PORT || 5000;

const userRoutes = require('./api/routes/userRoute')

app.use('/api/v1/user', userRoutes);

const start =  async() => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
    const isSynced = await sequelizee.sync({ force: false });

    if (isSynced) {
      console.log('The models are created successfully.');
    } else {
      console.log('The models could not be created.');
    }
  } catch (error) {
    console.log(error);
  }
};

start()
