module.exports = {
  get: () => (
    {
      grantScheme: {
        key: 'PROD02',
        name: 'Prod Grant Robotics'
      },
      desirability: {
        questions: [
          {
            key: 'energy-source',
            answers: [
              {
                key: 'energy-source',
                title: 'Energy source',
                input: [{ key: 'robotics-energy-source-A4', value: 'Fossil fuels' }]
              }],
            rating: { score: null, band: null, importance: null }
          },
          {
            key: 'agricultural-sector',
            answers: [
              {
                key: 'agricultural-sector',
                title: 'Agricultural sector',
                input: [
                  { key: 'robotics-agricultural-sector-A4', value: 'Non-dairy livestock' }]
              }],
            rating: { score: null, band: null, importance: null }
          },
          {
            key: 'technology-use',
            answers: [
              {
                key: 'technology-use',
                title: 'Technology',
                input: [
                  { key: 'technology-use-A1', value: 'Yes, we’re using it now' }]
              }],
            rating: { score: null, band: null, importance: null }
          },
          {
            key: 'labour-replaced',
            answers: [
              {
                key: 'labour-replaced',
                title: 'Labour replaced',
                input: [
                  {
                    key: 'labour-replaced-A1',
                    value: '1 to 2 jobs'
                  }]
              }],
            rating: { score: null, band: null, importance: null }
          },
          {
            key: 'data-analytics',
            answers: [
              {
                key: 'data-analytics',
                title: 'Data analytics',
                input: [
                  {
                    key: 'data-analytics-A3',
                    value: 'No, we will not use any data analytics'
                  }]
              }],
            rating: { score: null, band: null, importance: null }
          },
          {
            key: 'eligibility-criteria',
            answers: [
              {
                answers: [
                  {
                    key: 'eligibility-criteria', title: 'Eligibility criteria',
                    input: [{ key: 'eligibility-criteria-A1', value: 'Has sensing system that can understand its environment' }, { key: 'eligibility-criteria-A2', value: 'Makes decisions and plans' }, { key: 'eligibility-criteria-A3', value: 'Can control its actuators (the devices that move robotic joints)' }, { key: 'eligibility-criteria-A4', value: 'Works in a continuous loop' }]
                  }],
                rating: { score: null, band: null, importance: null }
              }],
            rating: { score: null, band: null, importance: null }
          }],
        overallRating: { score: null, band: null }
      }
    })
}
