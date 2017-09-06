import Section from './section';
export default function (sequelize, DataTypes) {
    const SectionMatch = sequelize.define('SectionMatch', {
        sectionMatchId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sectionMatchSQLId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    const section = Section(sequelize, DataTypes);

    SectionMatch.belongsTo(section, { foreignKey: 'sectionId' });

    return SectionMatch;
}