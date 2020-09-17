const { DataTypes, Sequelize } = require('sequelize')
const db = require('../config/db')
const Text = require('./Text')


const Texturl = db.define('text_urls', {
  url_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  text_id: {
    type: DataTypes.UUID,
    foreignKey: true
  }
})

Texturl.associate = (models) => {
  Texturl.belongsTo(models.Text, {
    foreignKey: {
      allowNull: false
    }
  })
}
//Texturl.belongsTo(Text, { foreignKey: 'text_id' })


module.exports = Texturl
