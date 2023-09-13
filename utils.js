"use strict";

const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  const nums = [];

  for (const num of strNums) {
    if (isNaN(Number(num))) {
      throw new BadRequestError(`${num} is not a number`);
    }else {
      nums.push(Number(num));
    }
  }

  return nums;
}


module.exports = { convertStrNums };