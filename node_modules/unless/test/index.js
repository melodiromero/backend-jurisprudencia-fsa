'use strict';

var expect = require('expect.js');
var unless = require('..');

describe('unless()', function() {
  it('is a function', function () {
    expect(unless).to.be.a('function');
  });

  it('requires a function as the second argument', function() {
    expect(unless).withArgs(1, 1).to.throwException(/must be a function/i);
    expect(unless).withArgs(1, '1').to.throwException(/must be a function/i);
    expect(unless).withArgs(1, []).to.throwException(/must be a function/i);
    expect(unless).withArgs(1, {}).to.throwException(/must be a function/i);
    expect(unless).withArgs(1, new Date())
      .to.throwException(/must be a function/i);
    expect(unless).withArgs(1, function() {}).to.not.throwException();
  });

  it('executes the given function when the test is falsy', function() {
    var foo = 1;
    unless(false, function() { foo++; });
    expect(foo).to.be(2);
  });

  it('does not execute the given callback when the test is truthy', function() {
    var foo = 1;
    unless(true, function() { foo++; });
    expect(foo).to.be(1);
  });

  it('does not yield a return value', function() {
    expect(unless(1, function() {})).to.be(undefined);
  });
});
