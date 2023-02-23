module.exports = {
  get: () => (
    {
      grantScheme: {
        key: 'WM01',
        name: 'Water Management'
      },
      desirability: {
        questions: [
          {
            key: 'irrigated-crops',
            answers: [
              {
                key: null,
                title: 'What main crops will be irrigated?',
                input: [
                  {
                    key: 'irrigated-crops-A3',
                    value: 'Fruit'
                  }
                ]
              }
            ],
            rating: {
              score: null,
              band: null,
              importance: null
            }
          },
          {
            key: 'irrigated-land',
            answers: [
              {
                key: 'irrigated-land-a',
                title: 'How much land is currently irrigated in total per year?',
                input: [
                  {
                    key: null,
                    value: 20
                  }
                ]
              },
              {
                key: 'irrigated-land-b',
                title: 'How much land will be irrigated after the project?',
                input: [
                  {
                    key: null,
                    value: 21
                  }
                ]
              }
            ],
            rating: {
              score: null,
              band: null,
              importance: null
            }
          },
          {
            key: 'water-source',
            answers: [
              {
                key: 'water-source-a',
                title: 'Under your current irrigation, where does the water come from [primary?]?',
                input: [
                  {
                    key: 'water-source-a-A6',
                    value: 'Not currently irrigating'
                  }
                ]
              },
              {
                key: 'water-source-b',
                title: 'Where will your irrigation water come from?',
                input: [
                  {
                    key: 'water-source-b-A1',
                    value: 'Peak flow surface water'
                  }
                ]
              }
            ],
            rating: {
              score: null,
              band: null,
              importance: null
            }
          },
          {
            key: 'irrigation-system',
            answers: [
              {
                key: 'irrigation-system-a',
                title: 'What systems are [primarily] currently used to irrigate?',
                input: [
                  {
                    key: 'irrigation-system-a-A4',
                    value: 'Sprinklers'
                  },
                  {
                    key: 'irrigation-system-a-A5',
                    value: 'Capillary Bed'
                  }
                ]
              },
              {
                key: 'irrigation-system-b',
                title: 'What systems will be used to irrigate?',
                input: [
                  {
                    key: 'irrigation-system-b-A1',
                    value: 'Trickle'
                  },
                  {
                    key: 'irrigation-system-b-A2',
                    value: 'Mist'
                  }
                ]
              }
            ],
            rating: {
              score: null,
              band: null,
              importance: null
            }
          },
          {
            key: 'productivity',
            answers: [
              {
                key: null,
                title: 'How will the project improve productivity ',
                input: [
                  {
                    key: 'productivity-A1',
                    value: 'Introduce or expand High Value Crops'
                  },
                  {
                    key: 'productivity-A2',
                    value: 'Introduce or expand protected Crops'
                  }
                ]
              }
            ],
            rating: {
              score: null,
              band: null,
              importance: null
            }
          },
          {
            key: 'collaboration',
            answers: [
              {
                key: null,
                title: 'Will water be supplied to other farm [businesses]?',
                input: [
                  {
                    key: 'collaboration-A1',
                    value: 'Yes'
                  }
                ]
              }
            ],
            rating: {
              score: null,
              band: null,
              importance: null
            }
          }
        ],
        overallRating: {
          score: null,
          band: null
        }
      }
    })
}
