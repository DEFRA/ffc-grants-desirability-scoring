const createMessage = (body, type, options) => {
    return {
      body,
      type,
      source: 'ffc-grants-desirability-scoring',
      ...options
    }
  }
  
  module.exports = createMessage
  