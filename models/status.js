// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines

module.exports = function(sequelize, DataTypes) {
  var Status = sequelize.define("Status", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Status.associate = function(models) {
    Status.hasMany(models.Job, {
      onDelete: "cascade"
    });
  };
  return Status
}
