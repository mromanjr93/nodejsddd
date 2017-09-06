export default function (sequelize, DataTypes) {
    const OutletType = sequelize.define('OutletType', {
        outletTypeId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },        
        outletTypeDescription: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }           
    });   

    return OutletType;
}