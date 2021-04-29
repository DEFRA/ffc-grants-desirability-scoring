
module.exports = (sequelize, DataTypes) => {
  const scoreData = sequelize.define('scoredatas', {
    score_data_id: {
      type: DataTypes.BIGINT,
      defaultValue: DataTypes.BIGINT,
      primaryKey: true
    },
    scheme_type: { type: DataTypes.STRING, primaryKey: true },
    version: { type: DataTypes.STRING, primaryKey: true },
    data: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'scoredatas'
  })
  return scoreData
}
