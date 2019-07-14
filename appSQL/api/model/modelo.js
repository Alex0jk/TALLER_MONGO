/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('modelo', {
    CODIGOMODELO: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    NOMBRE: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    CODIGOMARCA: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'marca',
        key: 'CODIGOMARCA'
      }
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  });
};
