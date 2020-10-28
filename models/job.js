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
      created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
    });
    Job.associate = function(models) {
        Job.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
        Job.belongsTo(models.Status, {
            foreignKey: {
            allowNull: false
            }
        });
}
return Job
}