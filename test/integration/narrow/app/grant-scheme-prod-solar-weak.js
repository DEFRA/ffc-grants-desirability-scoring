module.exports = {
  get: () => (
    {
      grantScheme: {
        key: 'PROD01', name: 'Prod Grant Solar'
      },
      desirability: {
        questions: [
          {
            key: 'solar-technologies',
            answers: [
              {
                key: 'solar-technologies', title: 'Solar technology',
                input: [{ key: 'solar-technologies-A1', value: 'An electrical grid connection' }]
              }],
            rating: { score: null, band: null, importance: null }
          },
          {
            key: 'solar-output',
            answers: [
              {
                key: 'solar-output', title: 'Solar PV system size',
                input: [{ key: 'solar-output-A6', value: 'Solar panels not chosen' }]
              }],
            rating: { score: null, band: null, importance: null }
          },
          {
            key: 'agricultural-sector-solar', answers: [{ key: 'agricultural-sector-solar', title: 'Agricultural Sector', input: [{ key: 'agricultural-sector-solar-A2', value: 'Beef' }] }], rating: { score: null, band: null, importance: null }
          }],
        overallRating: { score: null, band: null }
      }
    }
  )
}
