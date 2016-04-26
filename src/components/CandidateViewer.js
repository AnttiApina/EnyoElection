var kind = require("enyo/kind");
var DataList = require('enyo/DataList');
var image = require('enyo/Image');
var Collection = require("enyo/Collection");
var chroma = require("chroma-js");


// Color lerping using chroma
function ColoringFunction(nVal) {
	var rVal = chroma.interpolate('#e74c3c', '#2ecc71', nVal);
	return rVal;
}

function CalculateRanks () {
	// Calculate the percentage of sameness and sort results based on it
	if(this.answerFilter.length === 0) return;
	var answerFilter = this.answerFilter;
	// Calculate the sameness
	this.candidates.forEach(function(cand) {
		var totalPercent = 0;
		var amount = 0;

		answerFilter.forEach(function(ans) {
			var id = ans.get("questionId");
			var value = ans.get("answerValue");

			var candidateValue = cand.answers.filter(function(a) {
				return a.id === id;
			})[0].value;


			totalPercent += Math.abs(value - candidateValue);
			amount++;
		});
		totalPercent = parseFloat( 2- (totalPercent / amount) ) /2;
		totalPercent = Math.round(totalPercent * 100) / 100;

		// set the percentage for the object
		cand["sameness"] = totalPercent;
	});


	var sorted = this.candidates.sort(function(a,b) {
		return b.sameness - a.sameness;
	});

	var sortedCollection = new Collection(sorted);
	this.set("collection", sortedCollection);

	// Due to some weird mistake, a new collection has to be made
	// Set sameness after collection has been created
}


var CandidateProfile = kind({
	name: 'elec.CandidateProfile',
	classes: 'elec-candidate-profile material-shadow',
	published: {
		candidateName: 'default',
		candidateId: 'default',
		partyName: 'default',
		sameness: ''
	},


	components: [
		{ tag: "div", classes:"result-image", components: [
			{ classes: "portrait", name: "image-portrait", kind: image, sizing: "cover", placeholder:'assets/portraits/default.jpg'}
		]},
		{ tag: 'div', classes:"result-content", components: [
			{ classes: "candidate-name", style:"color: #4183D7", name: "candidateName"},
			{ classes: "sameness-percent", name: "candidateSameness"},
			{ name: "partyName"},
			{ classes: "id-label", tag: "span", name: "candidateId"}
		]}
	],
	bindings: [
		{from: 'candidateName', to: '$.candidateName.content'},
		{from: 'candidateId', to: '$.candidateId.content'},
		{from: 'candidateId', to: '$.image-portrait.src', transform: function(id) { return 'assets/portraits/' + id + '.jpg'; }},
		{from: 'partyName', to: '$.partyName.content'},
		{from: 'sameness', to: '$.candidateSameness.content', transform: function(p) { return p === '' ? '' : Math.floor(p * 100) + " %";  }},
		{from: 'sameness', to: '$.candidateSameness.style', transform: function(p) { return 'color: ' + ColoringFunction(p); }}

	]
});


var CandidateList = kind({
	name: 'elec.CandidateList',
	kind: DataList,
	published: {
		candidates: null,
		answerFilter: []
	},

	answerFilterChanged: CalculateRanks,
	bindings: [
		{from: 'candidates', to: 'collection'}
	],
	components: [{
		classes: 'elec-profile-wrapper',

		components: [{
				kind: CandidateProfile,
				name: "profile"
		}],

		bindings: [
			{from: 'model.candidateName', to: '$.profile.candidateName'},
			{from: 'model.candidateId', to: '$.profile.candidateId'},
			{from: 'model.sameness', to: '$.profile.sameness'},
			{from: 'model.party', to: '$.profile.partyName'}


		]}
	]}
);

var CandidateViewer = kind({
	classes: "elec-candidate-viewer",
	published: {
		candidates: null,
		answers: []
	},
	create: function() {
		this.inherited(arguments);
		this.set("answers", new Collection());
	},
	addAnswer: function(answer) {
		var id = answer.questionId;
		var value = answer.answerValue;
		var found = false;
		this.get("answers").forEach(function(q) {
			if(q.get("questionId") === id) {
				//console.log("Setting value");
				found = true;
				q.set("answerValue", value);
			}
		});

		if(found === false) {
			this.answers.add(answer);
		}
		var temp = this.get("answers");
		this.set("answers", new Collection(temp)); // TODO: fix this
	},
	components: [
		{name: "candidateList", kind: CandidateList}
	],
	bindings:[
		{from: "candidates", to:"$.candidateList.candidates"},
		{from: "answers", to:"$.candidateList.answerFilter"}
	]

});

module.exports = CandidateViewer;
