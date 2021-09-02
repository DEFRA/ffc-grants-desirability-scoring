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
                value: 'Yes',
                input: [
                  {
                    key: 'robotics-technology-A1',
                    value: 'Yes'
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
                key: 'robotics-energy-source-A1',
                value: 'Electricity – derived from renewable generation on farm',
                input: [
                  {
                    key: 'robotics-energy-source-A1',
                    value: 'Electricity – derived from renewable generation on farm'
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
                value: 'Livestock (diary)',
                input: [
                  {
                    key: 'robotics-agricultural-sector-A4',
                    value: 'Livestock (diary)'
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
