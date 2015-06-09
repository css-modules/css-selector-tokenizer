"use strict";

/*globals describe it */

var assert = require("assert");
var Tokenizer = require("../");

describe("parseValues", function() {
	var testCases = require("./test-cases-values");
	Object.keys(testCases).forEach(function(testCase) {
		it("should parse values " + testCase, function() {
			var input = testCases[testCase][0];
			var expected = testCases[testCase][1];
			assert.deepEqual(Tokenizer.parseValues(input), expected);
		});
	});
});
