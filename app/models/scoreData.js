
module.exports = (sequelize, DataTypes) => {
  const scoreData = sequelize.define('scoreDatas', {
    scoreDataId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    schemeType: { type: DataTypes.STRING, primaryKey: true },
    version: { type: DataTypes.STRING, primaryKey: true },
    data: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'scoreDatas'
  })
  return scoreData
}
