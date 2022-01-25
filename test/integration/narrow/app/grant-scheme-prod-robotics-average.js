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
                key: 'robotics-technology-A2',
                value: 'Yes, as a pilot, demonstration or trial',
                input: [
                  {
                    key: 'robotics-technology-A2',
                    value: 'Yes, as a pilot, demonstration or trial'
                  }
                ]
              }
            ]
          },
          {
            key: 'robotics-data-analytics',
            answers: [
              {
                key: 'robotics-data-analytics-A2',
                value: 'Yes, we’ll buy the technology as part of the project',
                input: [
                  {
                    key: 'robotics-data-analytics-A2',
                    value: 'Yes, we’ll buy the technology as part of the project'
                  }
                ]
              }
            ]
          },
          {
            key: 'robotics-energy-source',
            answers: [
              {
                key: 'robotics-energy-source-A3',
                value: 'Biofuels',
                input: [
                  {
                    key: 'robotics-energy-source-A3',
                    value: 'Biofuels'
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
