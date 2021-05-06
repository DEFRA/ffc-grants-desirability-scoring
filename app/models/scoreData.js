
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('scoredatas', {
    score_data_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
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
}
