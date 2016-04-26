/**
	For simple applications, you might define all of your views in this file.
	For more complex applications, you might choose to separate these kind definitions
	into multiple files under this folder and require() as needed.
*/

var kind = require('enyo/kind');
var FittableColumns = require('layout/FittableColumns');
var CandidateViewer = require('../components/CandidateViewer.js');
var AnswerSheet = require('../components/AnswerSheet.js');
var data = require("../data/data.js");


	var ElectionApp = kind({
		name: 'elec.Application',
		classes: "app-container",
		kind: FittableColumns,
		components: [
			{classes: "half-panel left", fit: true, name: "AnswerSheet", kind: AnswerSheet, questionData: data.questions},
			{classes: "half-panel right", fit: true, name: "CandidateViewer", kind: CandidateViewer, candidates: data.candidates}
		],
		create: function() {
			this.inherited(arguments);
		},
		handlers: {
			onQuestionAnswered: "answer"
		},
		answer: function(inSender, inEvent) {
			this.$.CandidateViewer.addAnswer({questionId: inEvent.questionId, answerValue: inEvent.answerValue});
		}
});


module.exports = ElectionApp;
