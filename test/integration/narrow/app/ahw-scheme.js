module.exports = {
	get: (req, res) => {
		return {
			"grantScheme": {
				"key": "CALF01",
				"name": "Upgrading Calf Housing"
			},
			"desirability": {
				"overallRatingScoreData": [
					{
						"name": "Strong",
						"value": "77.94",
						"type": "numeric"
					},
					{
						"name": "Weak",
						"value": "57.156",
						"type": "numeric"
					},
					{
						"name": "Average",
						"value": null,
						"type": "else"
					}
				],
				"questions": [
					{
						"key": "housing",
						"title": "Are you moving from individually housing calves over 7 days old to pair or group housing?",
						"maxScore": 200,
						"weight": 14.76,
						"showResult": true,
						"scoreType": "BoolWeightScore",
						"answer": [
							{
								"key": "housing-A1",
								"weight": 1,
								"value": "Yes"
							},
							{
								"key": "housing-A2",
								"weight": 0,
								"value": "No"
							}
						],
						"rating": {
							"score": null,
							"band": null,
							"importance": null
						},
						"scoreData": {
							"scoreBand": [
								{
									"name": "Weak",
									"value": "0",
									"type": "numeric"
								},
								{
									"name": "Strong",
									"value": null,
									"type": "else"
								}
							]
						}
					},
					{
						"key": "calf-group-size",
						"title": "What will be the average calf group size be for calves over 7 days old?",
						"maxScore": 70,
						"weight": 5.17,
						"showResult": true,
						"scoreType": "BoolWeightScore",
						"answer": [
							{
								"key": "calf-group-size-A1",
								"weight": 0.57,
								"value": "2 to 3"
							},
							{
								"key": "calf-group-size-A2",
								"weight": 1,
								"value": "4 to 8"
							},
							{
								"key": "calf-group-size-A3",
								"weight": 0.57,
								"value": "9 to 12"
							},
							{
								"key": "calf-group-size-A4",
								"weight": 0.14,
								"value": "13 or more"
							}
						],
						"rating": {
							"score": null,
							"band": null,
							"importance": null
						},
						"scoreData": {
							"scoreBand": [
								{
									"name": "Weak",
									"value": "0",
									"type": "numeric"
								},
								{
									"name": "Strong",
									"value": null,
									"type": "else"
								}
							]
						}
					},
					{
						"key": "number-of-calves",
						"title": "What will be the maximum number of calves in the calf housing?",
						"maxScore": 75,
						"weight": 5.54,
						"showResult": true,
						"scoreType": "BoolWeightScore",
						"answer": [
							{
								"key": "number-of-calves-A1",
								"weight": 1,
								"value": "2-50"
							},
							{
								"key": "number-of-calves-A2",
								"weight": 0,
								"value": "51-100"
							},
							{
								"key": "number-of-calves-A3",
								"weight": 0,
								"value": "Over 100"
							}
						],
						"rating": {
							"score": null,
							"band": null,
							"importance": null
						},
						"scoreData": {
							"scoreBand": [
								{
									"name": "Weak",
									"value": "0",
									"type": "numeric"
								},
								{
									"name": "Strong",
									"value": null,
									"type": "else"
								}
							]
						}
					},
					{
						"key": "moisture-control",
						"title": "How will your building control moisture?",
						"maxScore": 150,
						"weight": 11.07,
						"showResult": true,
						"scoreType": "MultiSelectNoMatrix",
						"answer": [
							{
								"key": "moisture-control-A1",
								"weight": 0.33,
								"value": "A drain or drainage channel inside the pen"
							},
							{
								"key": "moisture-control-A2",
								"weight": 0.33,
								"value": "Positioning drinking areas near drainage and away from bedding"
							},
							{
								"key": "moisture-control-A3",
								"weight": 0.33,
								"value": "A separate preparation or washing area"
							},
							{
								"key": "moisture-control-A4",
								"weight": 0,
								"value": "None of the above"
							}
						],
						"rating": {
							"score": null,
							"band": null,
							"importance": null
						},
						"scoreData": {
							"scoreBand": [
								{
									"name": "Strong",
									"value": "0.7",
									"type": "numeric"
								},
								{
									"name": "Weak",
									"value": "0.3",
									"type": "numeric"
								},
								{
									"name": "Strong",
									"value": null,
									"type": "else"
								}
							]
						}
					},
					{
						"key": "permanent-sick-pen",
						"title": "What type of sick pen will your building have?",
						"maxScore": 175,
						"weight": 12.92,
						"showResult": true,
						"scoreType": "MultiSelectNoMatrix",
						"answer": [
							{
								"key": "permanent-sick-pen-A1",
								"weight": 0.42,
								"value": "A permanent sick pen"
							},
							{
								"key": "permanent-sick-pen-A2",
								"weight": 0.42,
								"value": "A separate air space"
							},
							{
								"key": "permanent-sick-pen-A3",
								"weight": 0.14,
								"value": "A permanent heat source"
							},
							{
								"key": "permanent-sick-pen-A4",
								"weight": 0,
								"value": "None of the above"
							}
						],
						"rating": {
							"score": null,
							"band": null,
							"importance": null
						},
						"scoreData": {
							"scoreBand": [
								{
									"name": "Weak",
									"value": "0",
									"type": "numeric"
								},
								{
									"name": "Strong",
									"value": null,
									"type": "else"
								}
							]
						}
					},
					{
						"key": "living-space",
						"title": "What will be the minimum living space per calf?",
						"scoreType": "userInput",
						"maxScore": 100,
						"weight": 11.07,
						"rating": {
							"score": null,
							"band": null,
							"importance": null
						},
						"scoreData": {
							"scoreBand": [
								{
									"name": "Weak",
									"value": "0",
									"type": "numeric"
								},
								{
									"name": "Strong",
									"value": null,
									"type": "else"
								}
							]
						}
					},
					{
						"key": "automatic-calf-feeder",
						"title": "How many calves will you have per automatic feeder?",
						"maxScore": 30,
						"weight": 2.21,
						"showResult": true,
						"scoreType": "BoolWeightScore",
						"answer": [
							{
								"key": "automatic-calf-feeder-A1",
								"weight": 1,
								"value": "2 to 3"
							},
							{
								"key": "automatic-calf-feeder-A2",
								"weight": 0.66,
								"value": "4 to 8"
							},
							{
								"key": "automatic-calf-feeder-A3",
								"weight": 0.33,
								"value": "9 to 12"
							},
							{
								"key": "automatic-calf-feeder-A4",
								"weight": 0.16,
								"value": "13 or more"
							},
							{
								"key": "automatic-calf-feeder-A5",
								"weight": 0,
								"value": "We do not use an automatic feeder"
							}
						],
						"rating": {
							"score": null,
							"band": null,
							"importance": null
						},
						"scoreData": {
							"scoreBand": [
								{
									"name": "Weak",
									"value": "0",
									"type": "numeric"
								},
								{
									"name": "Strong",
									"value": null,
									"type": "else"
								}
							]
						}
					},
					{
						"key": "environmental-impact",
						"title": "How will the building minimise environmental impact?",
						"maxScore": 150,
						"weight": 11.07,
						"showResult": true,
						"scoreType": "MultiSelectNoMatrix",
						"answer": [
							{
								"key": "environmental-impact-A1",
								"weight": 0.74,
								"value": "Solar PV panels on the roof of the building"
							},
							{
								"key": "environmental-impact-A2",
								"weight": 0.25,
								"value": "Collect and store rainwater"
							},
							{
								"key": "environmental-impact-A3",
								"weight": 0,
								"value": "None of the above"
							}
						],
						"rating": {
							"score": null,
							"band": null,
							"importance": null
						},
						"scoreData": {
							"scoreBand": [
								{
									"name": "Weak",
									"value": "0",
									"type": "numeric"
								},
								{
									"name": "Strong",
									"value": null,
									"type": "else"
								}
							]
						}
					},
					{
						"key": "sustaiable-materials",
						"title": "Will your building use sustainable materials?",
						"maxScore": 220,
						"weight": 16.24,
						"showResult": true,
						"scoreType": "MultiSelectNoMatrix",
						"answer": [
							{
								"key": "sustaiable-materials-A1",
								"weight": 0.15,
								"value": "Low carbon concrete"
							},
							{
								"key": "sustaiable-materials-A2",
								"weight": 0.15,
								"value": "Steel replacement products"
							},
							{
								"key": "sustaiable-materials-A3",
								"weight": 0.15,
								"value": "Sustainably sourced timber"
							},
							{
								"key": "sustaiable-materials-A4",
								"weight": 0.15,
								"value": "Re-used materials already on site"
							},
							{
								"key": "sustaiable-materials-A5",
								"weight": 0.15,
								"value": "Re-used or second-hand materials from elsewhere"
							},
							{
								"key": "sustaiable-materials-A6",
								"weight": 0.15,
								"value": "Recycled materials"
							},
							{
								"key": "sustaiable-materials-A7",
								"weight": 0.04,
								"value": "Something else "
							},
							{
								"key": "sustaiable-materials-A",
								"weight": 0,
								"value": "None of the above"
							}
						],
						"rating": {
							"score": null,
							"band": null,
							"importance": null
						},
						"scoreData": {
							"scoreBand": [
								{
									"name": "Weak",
									"value": "0",
									"type": "numeric"
								},
								{
									"name": "Strong",
									"value": null,
									"type": "else"
								}
							]
						}
					},
					{
						"key": "introducing-innovation",
						"title": "Is your project introducing innovation? ",
						"maxScore": 135,
						"weight": 9.96,
						"showResult": true,
						"scoreType": "MultiSelectNoMatrix",
						"answer": [
							{
								"key": "introducing-innovation-A1",
								"weight": 0.33,
								"value": "Technology"
							},
							{
								"key": "introducing-innovation-A2",
								"weight": 0.33,
								"value": "Collaboration"
							},
							{
								"key": "introducing-innovation-A3",
								"weight": 0.33,
								"value": "Techniques"
							},
							{
								"key": "introducing-innovation-A4",
								"weight": 0,
								"value": " None of the above"
							}
						],
						"rating": {
							"score": null,
							"band": null,
							"importance": null
						},
						"scoreData": {
							"scoreBand": [
								{
									"name": "Weak",
									"value": "0",
									"type": "numeric"
								},
								{
									"name": "Strong",
									"value": null,
									"type": "else"
								}
							]
						}
					}
				],
				"overallRating": {
					"score": null,
					"band": null
				}
			}
		}
	}
};