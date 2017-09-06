import Outlet from './outlet';
import Provider from './provider';

export default function (sequelize, DataTypes) {
    const Section = sequelize.define('Section', {
        sectionId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sectionProviderSectionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        sectionName: {
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
                    fields: ['sectionProviderSectionId', 'sectionName', 'sectionProviderId']
                }
            ]
        });

    const outlet = Outlet(sequelize, DataTypes);
    const provider = Provider(sequelize, DataTypes);
    

    
    provider.hasMany(Section, { foreignKey: 'sectionProviderId' });
    Section.belongsTo(outlet, { foreignKey: 'sectionOutletId' });    


    return Section;
}