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
                key: 'project-subject-A2',
                value: 'Slurry acidification',
                input: [
                  {
                    key: 'project-subject-A2',
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
                key: 'project-impacts-A2',
                value: 'Increasing Acidification',
                input: [
                  {
                    key: 'project-impacts-A2',
                    value: 'Increasing Acidification'
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
