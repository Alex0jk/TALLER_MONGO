/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('marca', {
    CODIGOMARCA: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    NOMBRE: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  },
  {
    timestamps: false,
    freezeTableName: true
    });
};
