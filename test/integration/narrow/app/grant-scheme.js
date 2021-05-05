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
            key: 'Q14',
            answers: [
              {
                key: null,
                title: 'The project will:',
                input: [
                  {
                    key: 'Q14-A1',
                    value: 'Change water source'
                  },
                  {
                    key: 'Q14-A2',
                    value: 'Improve irrigation efficiency'
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
            key: 'Q15',
            answers: [
              {
                key: null,
                title: 'What main crops will be irrigated?',
                input: [
                  {
                    key: 'Q15-A3',
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
            key: 'Q16',
            answers: [
              {
                key: 'Q16a',
                title: 'How much land is currently irrigated in total per year?',
                input: [
                  {
                    key: null,
                    value: 20
                  }
                ]
              },
              {
                key: 'Q16b',
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
            key: 'Q17',
            answers: [
              {
                key: 'Q17a',
                title: 'Under your current irrigation, where does the water come from [primary?]?',
                input: [
                  {
                    key: 'Q17a-A6',
                    value: 'Not currently irrigating'
                  }
                ]
              },
              {
                key: 'Q17b',
                title: 'Where will your irrigation water come from?',
                input: [
                  {
                    key: 'Q17b-A1',
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
            key: 'Q18',
            answers: [
              {
                key: 'Q18a',
                title: 'What systems are [primarily] currently used to irrigate?',
                input: [
                  {
                    key: 'Q18a-A4',
                    value: 'Sprinklers'
                  },
                  {
                    key: 'Q18a-A5',
                    value: 'Capillary Bed'
                  }
                ]
              },
              {
                key: 'Q18b',
                title: 'What systems will be used to irrigate?',
                input: [
                  {
                    key: 'Q18b-A1',
                    value: 'Trickle'
                  },
                  {
                    key: 'Q18b-A2',
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
            key: 'Q19',
            answers: [
              {
                key: null,
                title: 'How will the project improve productivity ',
                input: [
                  {
                    key: 'Q19-A1',
                    value: 'Introduce or expand High Value Crops'
                  },
                  {
                    key: 'Q19-A2',
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
            key: 'Q20',
            answers: [
              {
                key: null,
                title: 'Will water be supplied to other farm [businesses]?',
                input: [
                  {
                    key: 'Q20-A1',
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
