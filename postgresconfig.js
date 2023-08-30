const { Sequelize } = require('sequelize')

const sequelizee = new Sequelize('postgres://fikayo:aTd9xPeNcSNagMLDwrRzYj1ScobAUDmS@dpg-cjmm2usdfrcc73a8hbs0-a.oregon-postgres.render.com/vidme', {
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