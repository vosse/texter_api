const Sequelize = require('sequelize')


const db = new Sequelize('texterdb', 'vosse', 'voda22', {
  host: 'localhost',
  dialect: 'postgres'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  define: {
    timestamps: false
  }
});


const con = async() => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


con()


module.exports = db
