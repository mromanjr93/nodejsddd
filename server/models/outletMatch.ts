
export default function (sequelize, DataTypes) {
    const OutletMatch = sequelize.define('OutletMatch', {  
        outletMatchId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },             
        outletMatchSQLId: {
            type: DataTypes.INTEGER,   
            allowNull: false,
            validate: {
                notEmpty: true
            }         
        }                         
    });
    
    return OutletMatch;
}