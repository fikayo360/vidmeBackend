import express, { Express, Request, Response } from 'express';
const app: Express = express();
import dotenv from 'dotenv';
dotenv.config();
const cors = require('cors');
const { Sequelize } = require('sequelize')
import { v4 as uuidv4 } from 'uuid';
app.use(cors());
app.use(express.json());
const {User} = require('./models/User')

const port = process.env.PORT || 5000;

const sequelize = new Sequelize('postgres://fikayo:aTd9xPeNcSNagMLDwrRzYj1ScobAUDmS@dpg-cjmm2usdfrcc73a8hbs0-a.oregon-postgres.render.com/vidme', {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: 'true'
    }
  }
});

const newU = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

app.post('/users', async (req: Request, res: Response) => {
  const id = uuidv4();
  const {email,name} = req.body
  let user;
  try{
    user = await newU.create({
      id,
      name,
      email,
      // username,
      // password,
      // profile_pic,
      // resettoken
    });
    console.log(user);
    res.status(200).json(user);
  }catch(err:any){
    console.log(err.response.data);
  }

});

const start =  async() => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
    const isSynced = await sequelize.sync({ force: false });

    if (isSynced) {
      console.log('The models are created successfully.');
      console.log(`user model ${sequelize.User}`);
    } else {
      console.log('The models could not be created.');
    }
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.log(error);
  }
};

start();