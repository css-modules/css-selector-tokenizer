"use strict";

var Parser = require("fastparse");

function commentMatch(match, content) {
	this.selector.nodes.push({
		type: "comment",
		content: content
	});
}

function typeMatch(type) {
	return function(match, name) {
		this.selector.nodes.push({
			type: type,
			name: name
		});
	};
}

function pseudoClassStartMatch(match, name) {
	var newToken = {
		type: "pseudo-class",
		name: name,
		content: ""
	};
	this.selector.nodes.push(newToken);
	this.token = newToken;
	this.brackets = 1;
	return "inBrackets";
}

function operatorMatch(match, before, operator, after) {
	var token = {
		type: "operator",
		operator: operator
	};
	if(before) {
		token.before = before;
	}
	if(after) {
		token.after = after;
	}
	this.selector.nodes.push(token);
}

function spacingMatch(match) {
	this.selector.nodes.push({
		type: "spacing",
		value: match
	});
}

function allMatch() {
	this.selector.nodes.push({
		type: "all"
	});
}

function attributeMatch(match, content) {
	this.selector.nodes.push({
		type: "attribute",
		content: content
	});
}

function irrelevantSpacingStartMatch(match) {
	this.selector.before = match;
}

function irrelevantSpacingEndMatch(match) {
	this.selector.after = match;
}

function nextSelectorMatch(match, before, after) {
	var newSelector = {
		type: "selector",
		nodes: []
	};
	if(before) {
		this.selector.after = before;
	}
	if(after) {
		newSelector.before = after;
	}
	this.root.nodes.push(newSelector);
	this.selector = newSelector;
}

function addToCurrent(match) {
	this.token.content += match;
}

function bracketStart(match) {
	this.token.content += match;
	this.brackets++;
}

function bracketEnd(match) {
	if(--this.brackets === 0) {
		return "selector";
	}
	this.token.content += match;
}

var parser = new Parser({
	selector: {
		"/\\*([\\s\\S]*?)\\*/": commentMatch,
		"\\.([A-Za-z_\\-0-9]+)": typeMatch("class"),
		"#([A-Za-z_\\-0-9]+)": typeMatch("id"),
		":([A-Za-z_\\-0-9]+)\\(": pseudoClassStartMatch,
		":([A-Za-z_\\-0-9]+)": typeMatch("pseudo-class"),
		"::([A-Za-z_\\-0-9]+)": typeMatch("pseudo-element"),
		"([A-Za-z_\\-0-9]+)": typeMatch("element"),
		"\\[([^\\]]+)\\]": attributeMatch,
		"\\*": allMatch,
		"(\\s*)([>+~])(\\s*)": operatorMatch,
		"(\\s*),(\\s*)": nextSelectorMatch,
		"\\s+$": irrelevantSpacingEndMatch,
		"^\\s+": irrelevantSpacingStartMatch,
		"\\s+": spacingMatch
	},
	inBrackets: {
		"/\\*[\\s\\S]*?\\*/": addToCurrent,
		"\"([^\\\\\"]|\\\\.)*\"": addToCurrent,
		"'([^\\\\']|\\\\.)*'": addToCurrent,
		"[^()'\"/]+": addToCurrent,
		"\\(": bracketStart,
		"\\)": bracketEnd,
		".": addToCurrent
	}
});

function parse(str) {
	var selectorNode = {
		type: "selector",
		nodes: []
	};
	var result = parser.parse("selector", str, {
		root: {
			type: "selectors",
			nodes: [
				selectorNode
			]
		},
		selector: selectorNode
	});
	return result.root;
}

module.exports = parse;
