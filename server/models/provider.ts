export default function (sequelize, DataTypes) {
    const Provider = sequelize.define('Provider', {
        providerId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        providerName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });
    

    return Provider;
}