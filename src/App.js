/**
	Define your enyo/Application kind in this file.
*/

var
	kind = require('enyo/kind'),
	layout = require('layout/FittableRows'),
	Image = require('enyo/Image'),
	MainView = require('./views/MainView');

	var main = kind({
		tag: "div",
		kind: layout,
		fit: true,
		classes: "container",
		components: [
			{ tag: "h1", style: "text-align: center; font-weight: 300; color: #4183D7; letter-spacing: 0.15em;", content: "Enyo Election"},

			{ name: "", components: [
				{ kind: MainView, classes:"material-shadow",	 style: "height: 600px; width: 900px;" },
				{ classes: "footer", fit: true, allowHtml: true,
					content: "<a href='http://enyojs.com'>EnyoJS</a> - <a href='http://gka.github.io/chroma.js/'>Chroma-js</a><br><a style='color: #D9363A; font-size: 2.5em;' href='http://www.anttipyykkonen.fi'>A<strong>P</strong></a>"
				}
			]}
		]
	});

module.exports = main;
