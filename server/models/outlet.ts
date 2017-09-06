import Provider from './provider';
import OutletType from './outletType';
import OutletMatch from './outletMatch';
export default function (sequelize, DataTypes) {
    const Outlet = sequelize.define('Outlet', {
        outletId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },       
        outletProviderOutletId: {
            type: DataTypes.INTEGER,   
            allowNull: false,
            validate: {
                notEmpty: true
            }         
        },
        outletName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }          
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['outletProviderOutletId', 'outletName', 'outletProviderId']
            }
        ]
    });   

    let provider = Provider(sequelize,DataTypes);
    let outletType = OutletType(sequelize,DataTypes);
    let outletMatch = OutletMatch(sequelize,DataTypes);
    
    
    provider.hasMany(Outlet,{ foreignKey : 'outletProviderId' })
    outletType.hasMany(Outlet, { foreignKey : 'outletTypeId' })    
    outletMatch.belongsTo(Outlet, { foreignKey : 'outletId' });
    
    return Outlet;
}