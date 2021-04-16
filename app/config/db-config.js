const { DefaultAzureCredential } = require('@azure/identity')
const env = {
  development: 'development',
  production: 'production',
  test: 'test'
}

function isProd () {
  return process.env.NODE_ENV === env.production
}

const hooks = {
  beforeConnect: async (cfg) => {
    if (isProd()) {
      const credential = new DefaultAzureCredential()
      const accessToken = await credential.getToken('https://ossrdbms-aad.database.windows.net')
      cfg.password = accessToken.token
    }
  }
}

const retry = {
  backoffBase: 500,
  backoffExponent: 1.1,
  match: [/SequelizeConnectionError/],
  max: 10,
  name: 'connection',
  timeout: 60000
}

const dbConfig = {
  database: process.env.POSTGRES_DB || 'ffc_grants_desirability_scoring',
  dialect: 'postgres',
  hooks,
  host: process.env.POSTGRES_HOST || 'ffc-grants-desirability-scoring-postgres',
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
  logging: process.env.POSTGRES_LOGGING || false,
  retry,
  schema: process.env.POSTGRES_SCHEMA_NAME || 'public',
  username: process.env.POSTGRES_USER
}

const config = {}
config[env.development] = dbConfig
config[env.production] = dbConfig
config[env.test] = dbConfig

module.exports = config
