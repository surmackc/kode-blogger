module.exports = (sequelize, DataTypes) => {
    return sequelize.define('articles', {
      id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false
      }
    //   ,
    //   body: {
    //     type: DataTypes.JSON,
    //     allowNull: true,
    //   }
    }, {
      timestamps: true 
    });
  };