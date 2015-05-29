"use strict";

/*globals describe it */

var assert = require("assert");
var Tokenizer = require("../");

describe("parse", function() {
	var testCases = require("./test-cases");
	Object.keys(testCases).forEach(function(testCase) {
		it("should parse " + testCase, function() {
			var input = testCases[testCase][0];
			var expected = testCases[testCase][1];
			assert.deepEqual(Tokenizer.parse(input), expected);
		});
	});
});
