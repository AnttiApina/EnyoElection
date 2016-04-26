var kind = require("enyo/kind");
var DataList = require('enyo/DataList');
var Slider = require('onyx/Slider');
var Control = require('enyo/Control');

var Question = kind({
	name: "elec.Question",
	classes: "elec-question clearfix",
	events: {
		onQuestionAnswered: ""
	},
	handlers: {
		onChange: "handleChange"
	},
	handleChange: function(inSender, inEvent) {
		this.doQuestionAnswered({questionId: this.questionId, answerValue: inEvent.value});
		this.$.checkmark.addClass("answered");
		return true;
	},
	published: {
		questionName: "default",
		questionId: -1,
		negOpinion: "Eri mieltä",
		posOpinion: "Samaa mieltä"
	},
	components: [
		{classes: "question-label", name: "label", tag: "div"},
		{classes: "checkmark", content: "✔", name: "checkmark", tag: "div"},
		{classes: "elec-slider", lockBar: false, name: "slider", kind: Slider, min:-1, max: 1, 	onchange: "makeChanges"},
		{name: "negOpinion", classes: "labelStatus to-left", content: "eri mieltä"},
		{name: "posOpinion", classes: "labelStatus to-right", content: "samaa mieltä"}
	],
	bindings: [
		{from: "questionName", to: "$.label.content", transform: function(v) { return this.questionId + ". " + v; } },
		{from: "negOpinion", to: "$.negOpinion.content"},
		{from: "posOpinion", to: "$.posOpinion.content"}

	]
});


var QuestionList = kind({
	name: "repeater",
	kind: DataList,
	published: {
		questions: null
	},
	bindings: [{from: "questions", to: "collection"}],
	components: [{
		classes: 'elec-question-wrapper',

		components: [{
				kind: Question,
				name: "question"
		}],

		bindings: [
			{from: 'model.question', to: '$.question.questionName'},
			{from: 'model.id', to: '$.question.questionId'},
			{from: 'model.negOpinion', to: '$.question.negOpinion'},
			{from: 'model.posOpinion', to: '$.question.posOpinion'}

		]}
	]
});

var AnswerSheet = kind({
		kind: Control,
		classes: "elec-answer-sheet",
		published: {
			questionData: null
		},
		components: [
			{name: "questionList", kind: QuestionList}
		],
		bindings: [
			{from: "questionData", to: "$.questionList.questions"}
		]
});

module.exports = AnswerSheet;
