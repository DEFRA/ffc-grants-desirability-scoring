const scoreDataRepository = require('../../../../app/services/score-repository')
const dbHelper = require('../../../db-helper')
const config = require('../../../../app/config/db-config')
const { Sequelize } = require('sequelize');
describe('Score Repository test', () => {

    beforeAll(async () => {
    await dbHelper.truncate()
    })

    afterAll(async () => {
        await dbHelper.truncate()
        await dbHelper.close()
    }, 30000)
    test('test connection with db',async ()=>{
        const sequelize = new Sequelize(config.database, config.username, config.password, {
            host: 'localhost',
            dialect:'postgres' 
          })
          console.log(sequelize)
          expect(async () => await sequelize.authenticate().then(() => {
            console.log("Success!");
          }).catch((err) => {
            throw err;
          })).not.toThrow()  
    })
    test('getScoreData returns ScoreData',async () => {
      const scoreData = await scoreDataRepository.getScoreData('Water Grant')
      expect(scoreData).toBeDefined()
    })
  })