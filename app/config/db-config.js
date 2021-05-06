const { DefaultAzureCredential } = require('@azure/identity')
const { environments } = require('./constants')

function isProd () {
  return process.env.NODE_ENV === environments.production
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
  username: process.env.POSTGRES_USER,
  define: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}

const config = {}
config[environments.development] = dbConfig
config[environments.production] = dbConfig
config[environments.test] = dbConfig

module.exports = config
