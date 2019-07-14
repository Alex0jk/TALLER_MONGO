/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehiculo', {
    CODIGOVEHICULO: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    CODIGOMARCA: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'marca',
        key: 'CODIGOMARCA'
      }
    },
    CODIGOMODELO: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'modelo',
        key: 'CODIGOMODELO'
      }
    },
    CODIGOPROPIETARIO: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'propietario',
        key: 'CODIGOPROPIETARIO'
      }
    },
    PLACA: {
      type: DataTypes.CHAR(7),
      allowNull: false
    },
    ANIO: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    MOTOR: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    TRANSMISION: {
      type: DataTypes.STRING(3),
      allowNull: false
    }
  },
  {
    timestamps: false
  },
  {
    freezeTableName: true
  });
};
