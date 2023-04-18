module.exports = {
	get: () => (
		{
			grantScheme: {
				key: "CH01",
				name: "Calves Housing"
			},
			desirability: {
				questions: [
					{
						key: "housing",
						answers: [
							{
								key: "housing",
								title: "Are you moving from individually housing calves over 7 days old to pair or group housing?",
								input: [
									{
										key: "housing-A1",
										value: "Yes"
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
						key: "calf-group-size",
						answers: [
							{
								key: "calf-group-size",
								title: "What will be the average calf group size for calves over 7 days old?",
								input: [
									{
										key: "calf-group-size-A1",
										value: "2 to 3"
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
						key: "number-of-calves",
						answers: [
							{
								key: "number-of-calves",
								title: "What will be the maximum number of calves in the calf housing?",
								input: [
									{
										key: "number-of-calves-A2",
										value: "51 to 100"
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
						key: "automatic-calf-feeder",
						answers: [
							{
								key: "automatic-calf-feeder",
								title: "How many calves will you have per automatic feeder?",
								input: [
									{
										key: "automatic-calf-feeder-A2",
										value: "5 to 8"
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
						key: "permanent-sick-pen",
						answers: [
							{
								key: "permanent-sick-pen",
								title: "What type of sick pen will your building have?",
								input: [
									{
										key: "permanent-sick-pen-A1",
										value: "A permanent sick pen"
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
						key: "floor-space",
						answers: [
							{
								key: "floor-space",
								title: "How many calves will you have per automatic feeder?",
								input: [
									{
										key: "2",
										value: "5"
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
						key: "environmental-impact",
						answers: [
							{
								key: "environmental-impact",
								title: "How will the building minimise environmental impact?",
								input: [
									{
										key: "environmental-impact-A1",
										value: "Solar PV panels on the roof of the building"
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
						key: "automatic-calf-feeder",
						answers: [
							{
								key: "automatic-calf-feeder",
								title: "How many calves will you have per automatic feeder?",
								input: [
									{
										key: "automatic-calf-feeder-A2",
										value: "5 to 8"
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
};