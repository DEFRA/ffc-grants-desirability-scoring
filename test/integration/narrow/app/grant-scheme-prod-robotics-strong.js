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
                value: 'No',
                input: [
                  {
                    key: 'robotics-technology-A2',
                    value: 'No'
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
                key: 'robotics-energy-source-A2',
                value: 'Renewable electricity generated on the farm',
                input: [
                  {
                    key: 'robotics-energy-source-A2',
                    value: 'Renewable electricity generated on the farm'
                  }
                ]
              },
              {
                key: 'robotics-energy-source-A2',
                value: 'Biofuels',
                input: [
                  {
                    key: 'robotics-energy-source-A2',
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
                key: 'robotics-agricultural-sector-A1',
                value: 'Horticulture',
                input: [
                  {
                    key: 'robotics-agricultural-sector-A1',
                    value: 'Horticulture'
                  }
                ]
              }
            ]
          },
          {
            key: 'eligibility-criteria',
            answers: [
              {
                answers: [
                  {
                    key: 'eligibility-criteria',
                    input: [
                      {
                        key: 'eligibility-criteria-A1',
                        value: 'Has sensing system that can understand its environment'
                      },
                      {
                        key: 'eligibility-criteria-A4',
                        value: 'Works in a continuous loop'
                      },
                      {
                        key: 'eligibility-criteria-A2',
                        value: 'Makes decisions and plans'
                      },
                      {
                        key: 'eligibility-criteria-A3',
                        value: 'Can control its actuators (the devices that move robotic joints)'
                      }
                    ]
                  }
                ]
              },
              {
                answers: [
                  {
                    key: 'eligibility-criteria',
                    value: 'Makes decisions and plans',
                    input: [
                      {
                        key: 'eligibility-criteria-A2',
                        value: 'Makes decisions and plans'
                      },
                      {
                        key: 'eligibility-criteria-A3',
                        value: 'Can control its actuators (the devices that move robotic joints)'
                      },
                      {
                        key: 'eligibility-criteria-A1',
                        value: 'Has sensing system that can understand its environment'
                      },
                      {
                        key: 'eligibility-criteria-A4',
                        value: 'Works in a continuous loop'
                      }
                    ]
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
    }),

  noEligGet: () => (
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
                value: 'No',
                input: [
                  {
                    key: 'robotics-technology-A2',
                    value: 'No'
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
                key: 'robotics-energy-source-A2',
                value: 'Renewable electricity generated on the farm',
                input: [
                  {
                    key: 'robotics-energy-source-A2',
                    value: 'Renewable electricity generated on the farm'
                  }
                ]
              },
              {
                key: 'robotics-energy-source-A2',
                value: 'Biofuels',
                input: [
                  {
                    key: 'robotics-energy-source-A2',
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
                key: 'robotics-agricultural-sector-A1',
                value: 'Horticulture',
                input: [
                  {
                    key: 'robotics-agricultural-sector-A1',
                    value: 'Horticulture'
                  }
                ]
              }
            ]
          },
          {
            key: 'eligibility-criteria',
            answers: [

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
