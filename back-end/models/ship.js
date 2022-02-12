module.exports = (sequelize, DataTypes) => {
    const Ship = sequelize.define('ship', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: DataTypes.STRING,
        displacement: DataTypes.STRING
    });

    Ship.associate = models => {
        Ship.hasMany(models.crewmember, {
            onDelete: "cascade"
        });
    }
    return Ship;

}