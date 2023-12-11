module.exports = {
  get: () => ({
    grantScheme:
    {
      key: 'PROD01',
      name: 'Prod Grant Solar'
    },
    desirability: {
      questions: [
        {
          key: 'solar-technologies',
          answers: [
            {
              key: 'solar-technologies',
              title: 'Solar technology',
              input: [
                {
                  key: 'solar-technologies-A2',
                  value: 'Solar PV panels'
                },
                {
                  key: 'solar-technologies-A4',
                  value: 'A battery'
                },
                {
                  key: 'solar-technologies-A5',
                  value: 'A utility meter'
                },
                {
                  key: 'solar-technologies-A6',
                  value: 'Power diverter'
                }
              ]
            }],
          rating: {
            score: null, band: null, importance: null
          }
        },
        {
          key: 'solar-output',
          answers: [
            {
              key: 'solar-output',
              title: 'Solar PV system size',
              input: [
                {
                  key: 'solar-output-A4',
                  value: '151kW to 200kW'
                }]
            }],
          rating:
            { score: null, band: null, importance: null }
        },
        {
          key: 'agricultural-sector-solar',
          answers: [
            {
              key: 'agricultural-sector-solar',
              title: 'Agricultural Sector',
              input: [
                {
                  key: 'agricultural-sector-solar-A8',
                  value: 'Sheep'
                }]
            }],
          rating: { score: null, band: null, importance: null }
        }],
      overallRating: { score: null, band: null }
    }
  })
}
