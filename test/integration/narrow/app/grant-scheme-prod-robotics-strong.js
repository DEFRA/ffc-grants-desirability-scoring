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
                key: 'First Adoption-A2',
                value: 'No',
                input: [
                  {
                    key: 'First Adoption-A2',
                    value: 'No'
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
                key: 'Agricultural Sector-A1',
                value: 'Horticulture',
                input: [
                  {
                    key: 'Agricultural Sector-A1',
                    value: 'Horticulture'
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
