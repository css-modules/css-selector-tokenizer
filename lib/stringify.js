"use strict";

var stringify;

function stringifyWithoutBeforeAfter(tree) {
	switch(tree.type) {
	case "selectors":
		return tree.nodes.map(stringify).join(",");
	case "selector":
		return tree.nodes.map(stringify).join("");
	case "element":
		return (typeof tree.namespace === "string" ? tree.namespace + "|" : "") + tree.name;
	case "class":
		return "." + tree.name;
	case "id":
		return "#" + tree.name;
	case "attribute":
		return "[" + tree.content + "]";
	case "spacing":
		return tree.value;
	case "pseudo-class":
		return ":" + tree.name + (typeof tree.content === "string" ? "(" + tree.content + ")" : "");
	case "nested-pseudo-class":
		return ":" + tree.name + "(" + tree.nodes.map(stringify).join(",") + ")";
	case "pseudo-element":
		return "::" + tree.name;
	case "universal":
		return (typeof tree.namespace === "string" ? tree.namespace + "|" : "") + "*";
	case "operator":
		return tree.operator;
	case "comment":
		return "/*" + tree.content + "*/";
	case "invalid":
		return tree.value;
	}
}


stringify = function stringify(tree) {
	var str = stringifyWithoutBeforeAfter(tree);
	if(tree.before) {
		str = tree.before + str;
	}
	if(tree.after) {
		str = str + tree.after;
	}
	return str;
};

module.exports = stringify;
