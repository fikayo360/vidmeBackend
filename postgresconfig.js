const { Sequelize } = require('sequelize')

const sequelizee = new Sequelize('postgres://fikayoadele:stZWgT2okvU9@ep-yellow-sunset-93327294.us-east-2.aws.neon.tech/neondb', {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: 'true'
    }
  }
});

sequelizee.authenticate()
  .then(() => {
    console.log('Connection successful!');
  })
  .catch((error) => {
    console.log('Connection failed:', error);
  });
  
module.exports = { sequelizee }