module.exports = {
  get: () => (
    {
      grantScheme: {
        key: 'PROD01',
        name: 'Prod Grant Solar'
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
            key: 'project-impacts',
            answers: [
              {
                key: 'project-impacts-A1',
                value: 'Introducing Acidification',
                input: [
                  {
                    key: 'project-impacts-A1',
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
