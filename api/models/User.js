const { DataTypes, Sequelize } = require('sequelize')
const db = require('../config/db')
const Text = require('./Text')


const User = db.define('users', {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  username: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING(35),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bio: {
    type: DataTypes.STRING(140)
  },
  location: {
    type: DataTypes.STRING(50)
  },
  age: {
    type: DataTypes.SMALLINT
  },
  texts_count: {
    type: DataTypes.INTEGER
  },
  followers_count: {
    type: DataTypes.INTEGER
  },
  following_count: {
    type: DataTypes.INTEGER
  },
  created_at: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
})

User.associate = (models) => {
  User.hasMany(models.Text, {
    onDelete: 'cascade'
  })
}



module.exports = User
