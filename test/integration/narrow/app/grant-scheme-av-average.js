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
                title: 'What type of products are being processed?',
                input: [
                  {
                    key: 'products-processed-A1',
                    value: 'Arable crops'
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
                    value: 'Processing or preparing primary product'
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
                    value: 'Diversifying into creating added-value products'
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
                title: 'Who are your current customers?',
                input: [
                  {
                    key: 'future-customers-A1',
                    value: 'Processors'
                  },
                  {
                    key: 'future-customers-A2',
                    value: 'Wholesalers'
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
                title: 'Who are your current customers?',
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
                    key: 'products-coming-from-A3',
                    value: 'Within 50 miles'
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
                    key: 'processed-sold-A3',
                    value: 'Within 50 miles'
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
                    key: 'environmental-impact-A2',
                    value: 'Water efficiency'
                  },
                  {
                    key: 'environmental-impact-A3',
                    value: 'Waste efficiency'
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
