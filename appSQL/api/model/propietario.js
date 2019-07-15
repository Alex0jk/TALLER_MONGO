/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('propietario', {
    CODIGOPROPIETARIO: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    CEDULA: {
      type: DataTypes.CHAR(10),
      allowNull: false
    },
    NOMBRE: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    FECHANACIMIENTO: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  });
};
