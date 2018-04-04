module.exports = (sequelize, DataTypes) => {
    return sequelize.define('notes', {
      id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    }, {
      timestamps: false
    });
  };