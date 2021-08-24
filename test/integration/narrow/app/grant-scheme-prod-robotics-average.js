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
                key: 'Data Collection & Monitoring-A2',
                value: 'Yes, we’ll buy the technology as part of the project',
                input: [
                  {
                    key: 'Data Collection & Monitoring-A2',
                    value: 'Yes, we’ll buy the technology as part of the project'
                  }
                ]
              }
            ]
          },
          {
            key: 'Energy Source',
            answers: [
              {
                key: 'Energy Source-A2',
                value: 'Biofuels',
                input: [
                  {
                    key: 'Energy Source-A2',
                    value: 'Biofuels'
                  }
                ]
              }
            ]
          },
          {
            key: 'Agricultural Sector',
            answers: [
              {
                key: 'Agricultural Sector-A3',
                value: 'Livestock (non-diary)',
                input: [
                  {
                    key: 'Agricultural Sector-A3',
                    value: 'Livestock (non-diary)'
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
