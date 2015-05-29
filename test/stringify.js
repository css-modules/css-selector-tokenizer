"use strict";

/*globals describe it */

var assert = require("assert");
var Tokenizer = require("../");

describe("stringify", function() {
	var testCases = require("./test-cases");
	Object.keys(testCases).forEach(function(testCase) {
		it("should stringify " + testCase, function() {
			var input = testCases[testCase][1];
			var expected = testCases[testCase][0];
			assert.deepEqual(Tokenizer.stringify(input), expected);
		});
	});
});
