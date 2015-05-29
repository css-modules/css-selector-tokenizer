"use strict";

function singleSelector(nodes) {
	return {
		type: "selectors",
		nodes: [
			{
				type: "selector",
				nodes: nodes
			}
		]
	};
}

module.exports = {
	"element": [
		"body",
		singleSelector([
			{ type: "element", name: "body" }
		])
	],

	"class name": [
		".className",
		singleSelector([
			{ type: "class", name: "className" }
		])
	],

	"id name": [
		"#idName",
		singleSelector([
			{ type: "id", name: "idName" }
		])
	],

	"pseudo class": [
		":before",
		singleSelector([
			{ type: "pseudo-class", name: "before" }
		])
	],

	"pseudo class with content": [
		":not(.className)",
		singleSelector([
			{ type: "pseudo-class", name: "not", content: ".className" }
		])
	],

	"pseudo element": [
		"::first-line",
		singleSelector([
			{ type: "pseudo-element", name: "first-line" }
		])
	],

	"all": [
		"*",
		singleSelector([
			{ type: "all" }
		])
	],

	"attribute": [
		"a[href=\"#xyz\"]",
		singleSelector([
			{ type: "element", name: "a" },
			{ type: "attribute", content: "href=\"#xyz\"" }
		])
	],

	"comment": [
		"/*** Hello *** World ***/",
		singleSelector([
			{ type: "comment", content: "** Hello *** World **" }
		])
	],

	"operators": [
		"a > .class-name~.x123+ div",
		singleSelector([
			{ type: "element", name: "a" },
			{ type: "operator", operator: ">", before: " ", after: " " },
			{ type: "class", name: "class-name" },
			{ type: "operator", operator: "~" },
			{ type: "class", name: "x123" },
			{ type: "operator", operator: "+", after: " " },
			{ type: "element", name: "div" }
		])
	],

	"spacing": [
		"\ta b\n\tc ",
		{
			type: "selectors",
			nodes: [
				{
					type: "selector",
					nodes: [
						{ type: "element", name: "a" },
						{ type: "spacing", value: " " },
						{ type: "element", name: "b" },
						{ type: "spacing", value: "\n\t" },
						{ type: "element", name: "c" }
					],
					before: "\t",
					after: " "
				}
			]
		}
	],

	"mulitple-selectors": [
		"a.class, #classB ,c div .class",
		{
			type: "selectors",
			nodes: [
				{
					type: "selector",
					nodes: [
						{ type: "element", name: "a" },
						{ type: "class", name: "class" }
					]
				},
				{
					type: "selector",
					nodes: [
						{ type: "id", name: "classB" }
					],
					before: " ",
					after: " "
				},
				{
					type: "selector",
					nodes: [
						{ type: "element", name: "c" },
						{ type: "spacing", value: " " },
						{ type: "element", name: "div" },
						{ type: "spacing", value: " " },
						{ type: "class", name: "class" }
					]
				}
			]
		}
	],

	"pseudo class with difficult content": [
		":--anything-new(/* here is difficult ')][ .content */\nurl('Hello)World'), \"Hello)\\\".World\")",
		singleSelector([
			{ type: "pseudo-class", name: "--anything-new", content: "/* here is difficult ')][ .content */\nurl('Hello)World'), \"Hello)\\\".World\"" }
		])
	],

	"import": [
		":import(\"./module.css\")",
		singleSelector([
			{ type: "pseudo-class", name: "import", content: "\"./module.css\"" }
		])
	]
};
