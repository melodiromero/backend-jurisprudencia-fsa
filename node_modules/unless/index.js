module.exports = function(test, fn) {
  'use strict';
  if (Object.prototype.toString.call(arguments[1]) !== '[object Function]')
    throw new Error('Callback argument must be a function');
  if (!test) fn();
};
