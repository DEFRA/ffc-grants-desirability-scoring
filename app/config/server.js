const Joi = require('joi')

// Define config schema
const schema = Joi.object({
  protectiveMonitoringUrl: Joi.string().allow(''),
  appInsights: {
    key: Joi.string(),
    role: Joi.string().default('ffc-grants-desirability-scoring')
  }
})

// Build config
const config = {
  protectiveMonitoringUrl: process.env.PROTECTIVE_MONITORING_URL,
  appInsights: {
    key: process.env.APPINSIGHTS_INSTRUMENTATIONKEY,
    role: process.env.APPINSIGHTS_CLOUDROLE
  }
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

module.exports = result.value
