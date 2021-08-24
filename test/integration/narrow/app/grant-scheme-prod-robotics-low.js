module.exports = {
  get: () => (
    {
      grantScheme: {
        key: 'PROD02',
        name: 'Productivity Management Robotics'
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
            key: 'First Adoption',
            answers: [
              {
                key: 'First Adoption-A1',
                value: 'Yes',
                input: [
                  {
                    key: 'First Adoption-A1',
                    value: 'Yes'
                  }
                ]
              }
            ]
          },
          {
            key: 'Data Collection & Monitoring',
            answers: [
              {
                key: 'Data Collection & Monitoring-A3',
                value: 'No, we will not use any data analytics',
                input: [
                  {
                    key: 'Data Collection & Monitoring-A3',
                    value: 'No, we will not use any data analytics'
                  }
                ]
              }
            ]
          },
          {
            key: 'Energy Source',
            answers: [
              {
                key: 'Energy Source-A1',
                value: 'Electricity – derived from renewable generation on farm',
                input: [
                  {
                    key: 'Energy Source-A1',
                    value: 'Electricity – derived from renewable generation on farm'
                  }
                ]
              }
            ]
          },
          {
            key: 'Agricultural Sector',
            answers: [
              {
                key: 'Agricultural Sector-A4',
                value: 'Livestock (diary)',
                input: [
                  {
                    key: 'Agricultural Sector-A4',
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
