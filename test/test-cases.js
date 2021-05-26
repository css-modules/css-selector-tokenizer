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

	"element with namespace": [
		"foo|h1",
		singleSelector([
			{ type: "element", name: "h1", namespace: "foo" }
		])
	],

	"element with any namespace": [
		"*|h1",
		singleSelector([
			{ type: "element", name: "h1", namespace: "*" }
		])
	],

	"element without namespace": [
		"|h1",
		singleSelector([
			{ type: "element", name: "h1", namespace: "" }
		])
	],

	"class name": [
		".className",
		singleSelector([
			{ type: "class", name: "className" }
		])
	],

	"complex class name": [
		".class\\.Name",
		singleSelector([
			{ type: "class", name: "class.Name" }
		])
	],

	"class name starting with number or dash": [
		".\\5\\#-\\.5 .\\--name.-name",
		singleSelector([
			{ type: "class", name: "5#-.5" },
			{ type: "spacing", value: " " },
			{ type: "class", name: "--name" },
			{ type: "class", name: "-name" }
		])
	],

	"class name with high BMP character": [
		".字",
		singleSelector([
			{ type: "class", name: "字" }
		])
	],

	"class name with emoji": [
		".🤔",
		singleSelector([
			{ type: "class", name: "🤔" }
		])
	],

	"class name with multiple emoji": [
		".👍👌",
		singleSelector([
			{ type: "class", name: "👍👌" }
		])
	],

	"id name": [
		"#idName",
		singleSelector([
			{ type: "id", name: "idName" }
		])
	],

	"id name starting with number": [
		"#\\5\\#-\\.5",
		singleSelector([
			{ type: "id", name: "5#-.5" }
		])
	],

	"id name with latin-1 character": [
		"#¡",
		singleSelector([
			{ type: "id", name: "¡" }
		])
	],

	"id name with complex emoji": [
		".🖖🏼",
		singleSelector([
			{ type: "class", name: "🖖🏼" }
		])
	],

	"pseudo class": [
		":before",
		singleSelector([
			{ type: "pseudo-class", name: "before" }
		])
	],

	"pseudo class with escaping": [
		":be\\:fo\\#r\\.e",
		singleSelector([
			{ type: "pseudo-class", name: "be:fo#r.e" }
		])
	],

	"pseudo class with content": [
		":abc(.className)",
		singleSelector([
			{ type: "pseudo-class", name: "abc", content: ".className" }
		])
	],

	"pseudo class with content and escaping": [
		":a\\:b\\.c(.className)",
		singleSelector([
			{ type: "pseudo-class", name: "a:b.c", content: ".className" }
		])
	],

	"nested pseudo class with content": [
		":not(.className)",
		singleSelector([
			{ type: "nested-pseudo-class", name: "not", nodes: [
				{
					type: "selector",
					nodes: [
						{ type: "class", name: "className" }
					]
				}
			] }
		])
	],

	"pseudo element": [
		"::first-line",
		singleSelector([
			{ type: "pseudo-element", name: "first-line" }
		])
	],

	"pseudo element with escaping": [
		"::fir\\:\\:st\\.li\\#ne",
		singleSelector([
			{ type: "pseudo-element", name: "fir::st.li#ne" }
		])
	],

	"universal": [
		"*",
		singleSelector([
			{ type: "universal" }
		])
	],

	"universal with namespace": [
		"foo|*",
		singleSelector([
			{ type: "universal", namespace: "foo" }
		])
	],

	"universal with namespace and escaping": [
		"f\\|o\\.o|*",
		singleSelector([
			{ type: "universal", namespace: "f|o.o" }
		])
	],

	"universal with any namespace": [
		"*|*",
		singleSelector([
			{ type: "universal", namespace: "*" }
		])
	],

	"universal without namespace": [
		"|*",
		singleSelector([
			{ type: "universal", namespace: "" }
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
		"a > .class-name~.x123+ div >> col || td",
		singleSelector([
			{ type: "element", name: "a" },
			{ type: "operator", operator: ">", before: " ", after: " " },
			{ type: "class", name: "class-name" },
			{ type: "operator", operator: "~" },
			{ type: "class", name: "x123" },
			{ type: "operator", operator: "+", after: " " },
			{ type: "element", name: "div" },
			{ type: "operator", operator: ">>", before: " ", after: " " },
			{ type: "element", name: "col" },
			{ type: "operator", operator: "||", before: " ", after: " " },
			{ type: "element", name: "td" }
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
		":\\--anything-new(/* here is difficult ')][ .content */\nurl('Hello)World'), \"Hello)\\\".World\")",
		singleSelector([
			{ type: "pseudo-class", name: "--anything-new", content: "/* here is difficult ')][ .content */\nurl('Hello)World'), \"Hello)\\\".World\"" }
		])
	],

	"import": [
		":import(\"./module.css\")",
		singleSelector([
			{ type: "pseudo-class", name: "import", content: "\"./module.css\"" }
		])
	],

	"export": [
		":export",
		singleSelector([
			{ type: "pseudo-class", name: "export" }
		])
	],

	"local and global": [
		":global :local :global(.className a[href]):local( #idName )",
		singleSelector([
			{ type: "pseudo-class", name: "global" },
			{ type: "spacing", value: " " },
			{ type: "pseudo-class", name: "local" },
			{ type: "spacing", value: " " },
			{ type: "nested-pseudo-class", name: "global", nodes: [
				{ type: "selector", nodes: [
					{ type: "class", name: "className" },
					{ type: "spacing", value: " " },
					{ type: "element", name: "a" },
					{ type: "attribute", content: "href" }
				] }
			] },
			{ type: "nested-pseudo-class", name: "local", nodes: [
				{
					type: "selector", nodes: [
						{ type: "id", name: "idName" }
					],
					before: " ", after: " "
				}
			] }
		])
	],

	"nested pseudo class with multiple selectors": [
		":has( h1, h2 )",
		singleSelector([
			{ type: "nested-pseudo-class", name: "has", nodes: [
				{
					type: "selector",
					nodes: [
						{ type: "element", name: "h1" }
					],
					before: " "
				},
				{
					type: "selector",
					nodes: [
						{ type: "element", name: "h2" }
					],
					before: " ",
					after: " "
				}
			] }
		])
	],
  "nested pseudo class with multiple selectors (:is)": [
    ":is( h1, h2 )",
    singleSelector([
    {
        type: "nested-pseudo-class",
        name: "is",
        nodes: [
        {
            type: "selector",
            nodes: [{ type: "element", name: "h1" }],
            before: " ",
        },
        {
            type: "selector",
            nodes: [{ type: "element", name: "h2" }],
            before: " ",
            after: " ",
        },
        ],
    },
    ]),
  ],
  "nested pseudo class with multiple selectors (:where)": [
      ":where( h1, h2 )",
      singleSelector([
      {
          type: "nested-pseudo-class",
          name: "where",
          nodes: [
          {
              type: "selector",
              nodes: [{ type: "element", name: "h1" }],
              before: " ",
          },
          {
              type: "selector",
              nodes: [{ type: "element", name: "h2" }],
              before: " ",
              after: " ",
          },
          ],
      },
      ]),
  ],
	"available nested pseudo classes": [
		":not(:active):matches(:focus)",
		singleSelector([
			{ type: "nested-pseudo-class", name: "not", nodes: [
				{
					type: "selector",
					nodes: [
						{ type: "pseudo-class", name: "active" }
					]
				}
			] },
			{ type: "nested-pseudo-class", name: "matches", nodes: [
				{
					type: "selector",
					nodes: [
						{ type: "pseudo-class", name: "focus" }
					]
				}
			] }
		])
	],

	"nested pseudo class with nested selectors": [
		":has(h1:not(:has(:visited)))",
		singleSelector([
			{ type: "nested-pseudo-class", name: "has", nodes: [
				{
					type: "selector",
					nodes: [
						{ type: "element", name: "h1" },
						{ type: "nested-pseudo-class", name: "not", nodes: [
							{
								type: "selector",
								nodes: [
									{ type: "nested-pseudo-class", name: "has", nodes: [
										{
											type: "selector",
											nodes: [
												{ type: "pseudo-class", name: "visited" }
											]
										}
									] }
								]
							}
						] }
					]
				}
			] }
		])
	],

	"invalid chars": [
		"a'b/c\"d[e",
		singleSelector([
			{ type: "element", name: "a" },
			{ type: "invalid", value: "'" },
			{ type: "element", name: "b" },
			{ type: "invalid", value: "/" },
			{ type: "element", name: "c" },
			{ type: "invalid", value: "\"" },
			{ type: "element", name: "d" },
			{ type: "invalid", value: "[" },
			{ type: "element", name: "e" }
		])
	],

	"invalid nesting": [
		"a ) b",
		singleSelector([
			{ type: "element", name: "a" },
			{ type: "invalid", value: " )" },
			{ type: "spacing", value: " " },
			{ type: "element", name: "b" }
		])
	],

	"invalid number": [
		"0%",
		singleSelector([
			{ type: "invalid", value: "0" },
			{ type: "invalid", value: "%" }
		])
	],

	"invalid class name": [
		".10a0",
		singleSelector([
			{ type: "invalid", value: "." },
			{ type: "invalid", value: "1" },
			{ type: "invalid", value: "0" },
			{ type: "element", name: "a0" }
		])
	]
};
