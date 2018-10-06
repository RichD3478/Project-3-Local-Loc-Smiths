module.exports = function(sequelize, DataTypes) {
    let LocsSmith = sequelize.define("LocsSmith", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "none"
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "none"
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "none"
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "none"
      },
      addr: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "none"
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: "none"
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "none"
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "none"
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "none"
      },
      clientRating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: "1"
      },
      braiding: { 
        type: DataTypes.BOOLEAN, 
        allowNull: true, 
        defaultValue: false
      },
      hairlocs: { 
        type: DataTypes.BOOLEAN, 
        allowNull: true, 
        defaultValue: false
      }
    });
    return LocsSmith;
  };