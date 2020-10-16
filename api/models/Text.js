const { DataTypes, Sequelize } = require('sequelize')
const db = require('../config/db')
const Texturl = require('./Texturl')
const User = require('./User')


const Text = db.define('texts', {
  text_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.UUID,
    // foreignKey: true
    references :  { model: "User", key: "user_id" }
  },
  // url_id: {
  //   type: DataTypes.UUID
  // },
  created_at: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
})

//Text.belongsTo(Texturl, { foreignKey: 'url_id'})

// Text.assosciate = (models) => {
//   Text.belongsTo(models.User, {
//     foreignKey: 'user_id', as: "User"
//   })
// }


//Text.belongsTo(User)
//, { foreignKey: 'user_id' }


module.exports = Text
