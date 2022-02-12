module.exports = (sequelize, DataTypes) => {
    const Crewmember = sequelize.define('crewmember', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: DataTypes.STRING,
        role: DataTypes.STRING,
        shipId:DataTypes.INTEGER
    });

    Crewmember.associate = models => {
        Crewmember.belongsTo(models.ship, {
            as: 'ship',
            foreignKey: "shipId"
        });

    }

    return Crewmember;
}