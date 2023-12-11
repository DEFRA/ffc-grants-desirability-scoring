module.exports = {
  get: () => (
    {
      grantScheme:
        { key: 'PROD02', name: 'Prod Grant Robotics' },
      desirability: {
        questions: [
          {
            key: 'energy-source',
            answers: [
              {
                key: 'energy-source',
                title: 'Energy source',
                input: [
                  {
                    key: 'robotics-energy-source-A2',
                    value: 'Renewable electricity generated on the farm'
                  }]
              }],
            rating: { score: null, band: null, importance: null }
          },
          {
            key: 'agricultural-sector',
            answers: [{
              key: 'agricultural-sector',
              title: 'Agricultural sector',
              input: [
                { key: 'robotics-agricultural-sector-A1', value: 'Horticulture' }]
            }],
            rating: { score: null, band: null, importance: null }
          },
          {
            key: 'technology-use',
            answers: [
              {
                key: 'technology-use',
                title: 'Technology',
                input: [{
                  key: 'technology-use-A3',
                  value: 'Yes, as a pilot, demonstration or trial'
                }]
              }],
            rating: { score: null, band: null, importance: null }
          }, {
            key: 'labour-replaced',
            answers: [
              {
                key: 'labour-replaced',
                title: 'Labour replaced',
                input: [
                  {
                    key: 'labour-replaced-A3',
                    value: '5 or more jobs'
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
                  { key: 'data-analytics-A1', value: 'Yes, we have the technology already' }]
              }],
            rating: { score: null, band: null, importance: null }
          },
          {
            key: 'eligibility-criteria',
            answers: [
              {
                answers: [
                  {
                    key: 'eligibility-criteria',
                    title: 'Eligibility criteria',
                    input: [
                      { key: 'eligibility-criteria-A1', value: 'Has sensing system that can understand its environment' },
                      { key: 'eligibility-criteria-A2', value: 'Makes decisions and plans' },
                      { key: 'eligibility-criteria-A3', value: 'Can control its actuators (the devices that move robotic joints)' },
                      { key: 'eligibility-criteria-A4', value: 'Works in a continuous loop' }]
                  }],
                rating: { score: null, band: null, importance: null }
              }],
            rating: { score: null, band: null, importance: null }
          }],
        overallRating: { score: null, band: null }
      }
    })
}
