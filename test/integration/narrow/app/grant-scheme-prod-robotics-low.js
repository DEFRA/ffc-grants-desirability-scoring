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
            key: 'project-subject',
            answers: [
              {
                key: 'project-subject-A1',
                value: 'Robotics and innovation',
                input: [
                  {
                    key: 'project-subject-A1',
                    value: 'Robotics and innovation'
                  }
                ]
              }
            ]
          },
          {
            key: 'robotics-technology',
            answers: [
              {
                key: 'robotics-technology-A1',
                value: 'Yes, we’re using it now',
                input: [
                  {
                    key: 'robotics-technology-A1',
                    value: 'Yes, we’re using it now'
                  }
                ]
              }
            ]
          },
          {
            key: 'robotics-data-analytics',
            answers: [
              {
                key: 'robotics-data-analytics-A3',
                value: 'No, we will not use any data analytics',
                input: [
                  {
                    key: 'robotics-data-analytics-A3',
                    value: 'No, we will not use any data analytics'
                  }
                ]
              }
            ]
          },
          {
            key: 'robotics-energy-source',
            answers: [
              {
                key: 'robotics-energy-source-A4',
                value: 'Fossil fuels',
                input: [
                  {
                    key: 'robotics-energy-source-A4',
                    value: 'Fossil fuels'
                  }
                ]
              }
            ]
          },
          {
            key: 'robotics-agricultural-sector',
            answers: [
              {
                key: 'robotics-agricultural-sector-A4',
                value: 'Non-dairy livestock',
                input: [
                  {
                    key: 'robotics-agricultural-sector-A4',
                    value: 'Non-dairy livestock'
                  }
                ]
              }
            ]
          }
        ],
        overallRating: {
          score: null,
          band: null
        }
      }
    })
}
