module.exports = {
  get: () => (
    {
      grantScheme: {
        key: 'ADDVAL01',
        name: 'Adding Value Grant'
      },
      desirability: {
        questions: [
          {
            key: 'products-processed',
            answers: [
              {
                key: 'products-processed',
                title: 'What type of produce are being processed?',
                input: [
                  {
                    key: 'products-processed-A2',
                    value: 'Horticultural produce'
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
            key: 'how-adding-value',
            answers: [
              {
                key: 'how-adding-value',
                title: 'How will you add value to the products?',
                input: [
                  {
                    key: 'how-adding-value-A1',
                    value: 'Slaughtering, processing or preparing primary product'
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
            key: 'project-impact',
            answers: [
              {
                key: 'project-impact',
                title: 'What impact will the project have?',
                input: [
                  {
                    key: 'project-impact-A1',
                    value: 'Creating added-value products for the first time'
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
            key: 'future-customers',
            answers: [
              {
                key: 'future-customers',
                title: 'Who will your customers be after the project?',
                input: [
                  {
                    key: 'future-customers-A3',
                    value: 'Wholesalers'
                  },
                  {
                    key: 'future-customers-A4',
                    value: 'Retailers'
                  },
                  {
                    key: 'future-customers-A5',
                    value: 'Selling direct to consumers'
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
                key: 'collaboration',
                title: 'Will you buy materials from other farmers?',
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
          },
          {
            key: 'products-coming-from',
            answers: [
              {
                key: 'products-coming-from',
                title: 'Where are the primary products coming from?',
                input: [
                  {
                    key: 'products-coming-from-A1',
                    value: 'Within 1 mile'
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
            key: 'processed-sold',
            answers: [
              {
                key: 'processed-sold',
                title: 'Where are the processed products being sold?',
                input: [
                  {
                    key: 'processed-sold-A1',
                    value: 'Within 1 mile'
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
            key: 'environmental-impact',
            answers: [
              {
                key: 'environmental-impact',
                title: 'How will the project improve the environment?',
                input: [
                  {
                    key: 'environmental-impact-A1',
                    value: 'Energy efficiency'
                  },
                  {
                    key: 'environmental-impact-A5',
                    value: 'Reduce single-use plastics'
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
    }
  )
}
