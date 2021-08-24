module.exports = {
  get: () => (
    {
      grantScheme: {
        key: 'PROD01',
        name: 'Productivity Management Slurry'
      },
      desirability: {
        questions: [
          {
            key: 'project-subject',
            answers: [
              {
                key: 'project-subject-A1',
                value: 'Slurry acidification',
                input: [
                  {
                    key: 'project-subject-A1',
                    value: 'Slurry acidification'
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
                value: 'Introducing Acidification',
                input: [
                  {
                    key: 'First Adoption-A1',
                    value: 'Introducing Acidification'
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
