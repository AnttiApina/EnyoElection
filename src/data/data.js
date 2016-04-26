/**
	For simple applications, you might define all of your models, collections,
	and sources in this file.  For more complex applications, you might choose to separate
	these kind definitions into multiple files under this folder.
*/


var CandidateData = [
	{candidateId: 1, candidateName: "Juha Sipilä", party: "Keskusta", answers: [
		{ id: 1, value: 0 },
		{ id: 2, value: 0 },
		{ id: 3, value: 0 },
		{ id: 4, value: 0 },
		{ id: 5, value: 0 }
	]},
	{candidateId: 2, candidateName: "Alexander Stubb", party: "Kokoomus", answers: [
		{ id: 1, value: 1 },
		{ id: 2, value: 1 },
		{ id: 3, value: 1 },
		{ id: 4, value: 1 },
		{ id: 5, value: 1 }
	]},
	{candidateId: 3, candidateName: "Antti Rinne", party: "SDP", answers: [
		{ id: 1, value: -1 },
		{ id: 2, value: -1 },
		{ id: 3, value: -1 },
		{ id: 4, value: -1 },
		{ id: 5, value: -1 }

	]},
	{candidateId: 4, candidateName: "Paavo Väyrynen", party: "Paavopuolue", answers: [
		{ id: 1, value: -0.7 },
		{ id: 2, value: 0.5 },
		{ id: 3, value: 0.25 },
		{ id: 4, value: -0.7 },
		{ id: 5, value: 0.5 }
	]}
];

var QuestionData = [
	{id: 1, question: "Kesä on parempi kuin talvi"},
	{id: 2, question: "Turku on hieno paikka"},
	{id: 3, question: "Rahat vai kolmipyörä", negOpinion: "Rahat", posOpinion: "Kolmipyörä"},
	{id: 4, question: "Kumpi tulee päälle", negOpinion: "Kinkku", posOpinion: "Juusto"},
	{id: 5, question: "Ananas kuuluu pizzan päälle"}

];


module.exports = {candidates: CandidateData, questions: QuestionData };
