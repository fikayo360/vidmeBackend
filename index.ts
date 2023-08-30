import express, { Express, Request, Response } from 'express';
const app: Express = express();
import dotenv from 'dotenv';
dotenv.config();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const {sequelizee} = require('./postgresconfig')
const {Userr} = require('./src/models/User')
const port = process.env.PORT || 5000;
import { v4 as uuidv4 } from 'uuid';

app.post('/users', async (req: Request, res: Response) => {
    const id = uuidv4();
  const { email, username,password } = req.body;

  const user = await Userr.create({
    id,email,username,password
  });
  res.status(200).json('created')
  console.log(user);
});

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
