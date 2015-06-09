"use strict";

var stringify;

function stringifyWithoutBeforeAfter(tree) {
	switch(tree.type) {
	case "values":
		return tree.nodes.map(stringify).join(",");
	case "value":
		return tree.nodes.map(stringify).join("");
	case "item":
		return tree.name;
	case "comment":
		return "/*" + tree.content + "*/";
	case "string":
		switch(tree.stringType) {
		case "'":
			return "'" + tree.value.replace(/'/g, "\\'") + "'";
		case "\"":
			return "\"" + tree.value.replace(/"/g, "\\\"") + "\"";
		}
		/* istanbul ignore next */
		throw new Error("Invalid stringType");
	case "url":
		var start = "url(" + (tree.innerSpacingBefore || "");
		var end = (tree.innerSpacingAfter || "") + ")";
		switch(tree.stringType) {
		case "'":
			return start + "'" + tree.url.replace(/'/g, "\\'") + "'" + end;
		case "\"":
			return start + "\"" + tree.url.replace(/"/g, "\\\"") + "\"" + end;
		default:
			return start + tree.url.replace(/("|'|\))/g, "\\$1") + end;
		}
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
