module.exports = function(sequelize, DataTypes) {
    var Job = sequelize.define("Job", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company: {
        type: DataTypes.STRING,
        allowNull: false
      },
     status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "applied"
     },
    });
    Job.associate = function(models) {
        Job.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
    
}
return Job
}