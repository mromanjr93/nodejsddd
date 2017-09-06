import Section from './section';

export default function (sequelize, DataTypes) {
    const Page = sequelize.define('Page', {
        pageId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pageNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        pageSource: {
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    const section = Section(sequelize, DataTypes);
    
    Page.belongsTo(section, { foreignKey: 'pageSectionId' });

    return Page;
}