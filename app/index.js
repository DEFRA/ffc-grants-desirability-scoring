const server = require('./server')
const messageService = require('./messaging/service')

const init = async () => {
  const calculateScoreAction = require('./messaging/calculate-score')
  require('./messaging/receivers').startCalculateScoreReceiver(calculateScoreAction)

  await messageService.start()
  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  await messageService.stop()
  process.exit(1)
})

init()
