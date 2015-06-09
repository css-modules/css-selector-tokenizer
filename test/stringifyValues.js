"use strict";

/*globals describe it */

var assert = require("assert");
var Tokenizer = require("../");

describe("stringifyValues", function() {
	var testCases = require("./test-cases-values");
	Object.keys(testCases).forEach(function(testCase) {
		it("should stringify values " + testCase, function() {
			var input = testCases[testCase][1];
			var expected = testCases[testCase][0];
			assert.deepEqual(Tokenizer.stringifyValues(input), expected);
		});
	});
});
