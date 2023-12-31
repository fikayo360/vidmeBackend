import express, { Express} from 'express';
const app: Express = express();
import dotenv from 'dotenv';
dotenv.config();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const {sequelizee} = require('../postgresconfig')
const rateLimiter = require('express-rate-limit')
const ErrorHandler = require('./api/middlewares/error-handler')

const userRoutes = require('./api/routes/userRoute')
const videoRoutes = require('./api/routes/videoRoutes')
const likesRoutes = require('./api/routes/likeRoutes')
const commentsRoutes = require('./api/routes/commentRoutes')

app.use(ErrorHandler())
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/video', videoRoutes);
app.use('/api/v1/comment', commentsRoutes);
app.use('/api/v1/like', likesRoutes)

const port = process.env.PORT || 5000;

const appLimiter = rateLimiter({
  windowMs:1000,
  max:100
})

app.use(appLimiter())

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
