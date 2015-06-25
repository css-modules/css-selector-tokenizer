"use strict";

function singleValue(nodes) {
	return {
		type: "values",
		nodes: [
			{
				type: "value",
				nodes: nodes
			}
		]
	};
}

module.exports = {
	"item": [
		"item",
		singleValue([
			{ type: "item", name: "item" }
		])
	],
	"items": [
		"item other-item",
		singleValue([
			{ type: "item", name: "item", after: " " },
			{ type: "item", name: "other-item" }
		])
	],
	"multiple values": [
		"item other-item, second-value 3rd-value ,item",
		{
			type: "values",
			nodes: [
				{ type: "value", nodes: [
					{ type: "item", name: "item", after: " " },
					{ type: "item", name: "other-item" }
				] },
				{ type: "value", nodes: [
					{ type: "item", name: "second-value", after: " " },
					{ type: "item", name: "3rd-value", after: " " }
				], before: " " },
				{ type: "value", nodes: [
					{ type: "item", name: "item" }
				] }
			]
		}
	],
	"strings": [
		"'ab\\'\"c d' \"e\\\" f\"",
		singleValue([
			{ type: "string", value: "ab'\"c d", stringType: "'", after: " " },
			{ type: "string", value: "e\" f", stringType: "\"" }
		])
	],
	"comment": [
		"item /* hello world */ item",
		singleValue([
			{ type: "item", name: "item", after: " " },
			{ type: "comment", content: " hello world ", after: " " },
			{ type: "item", name: "item" }
		])
	],
	"urls": [
		"url('ab\\'\"c d') url( \"e\\\" f\" ) url( ghi\\)j\\\"k)",
		singleValue([
			{ type: "url", url: "ab'\"c d", stringType: "'", after: " " },
			{ type: "url", url: "e\" f", stringType: "\"", innerSpacingBefore: " ", innerSpacingAfter: " ", after: " " },
			{ type: "url", url: "ghi)j\"k", innerSpacingBefore: " " }
		])
	],
	"nested-item": [
		"format('woff')",
		singleValue([
			{ type: "nested-item", name: "format", nodes: [
				{ type: "value", nodes: [
					{ type: "string", stringType: "'", value: "woff"}
				]}
			] }
		])
	],
	"nested-item-difficult": [
		"format('woff'), format( \"a b, c\" )",
		{
			type: "values",
			nodes: [
				{ type: "value", nodes: [
					{ type: "nested-item", name: "format", nodes: [
						{ type: "value", nodes: [
							{ type: "string", stringType: "'", value: "woff"}
						]}
					] }
				] },
				{ type: "value", nodes: [
					{ type: "nested-item", name: "format", nodes: [
						{ type: "value", nodes: [
							{ type: "string", stringType: "\"", value: "a b, c"}
						], before: " ", after: " " }
					] }
				], before: " " }
			]
		}
	],
	"invalid": [
		" ) ) ",
		{
			type: "values",
			nodes: [
				{ type: "value", nodes: [
					{ type: "invalid", value: ")", after: " " },
					{ type: "invalid", value: ")" }
				], before: " ", after: " " }
			]
		}
	],
	"spacing": [
		"   hello\n\t world\t",
		{
			type: "values",
			nodes: [
				{ type: "value", nodes: [
					{ type: "item", name: "hello", after: "\n\t " },
					{ type: "item", name: "world" }
				], before: "   ", after: "\t" }
			]
		}
	],
	"escaped unicode": [
		"'\\f0e3\\\\\\'\"'",
		singleValue([
			{ type: "string", stringType: "'", value: "\uf0e3\\'\"" }
		])
	],
	"escaped unicode 2": [
		"\"\\f0e3\\\\'\\\"\"",
		singleValue([
			{ type: "string", stringType: "\"", value: "\uf0e3\\'\"" }
		])
	],
	"escaped unicode 3": [
		"\"\\2a\\\\'\\\"\"",
		singleValue([
			{ type: "string", stringType: "\"", value: "\u002a\\'\"" }
		])
	],
	"nested-item-with append": [
		"linear-gradient(45deg) 25%",
		singleValue([
			{ type: "nested-item", name: "linear-gradient", nodes: [
				{ type: "value", nodes: [
					{ type: "item", name: "45deg"}
				]}
			], after: " " },
			{ type: "item", name: "25%" }
		])
	]
};
