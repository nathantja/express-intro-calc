"use strict";

/** Simple demo Express app. */

const express = require("express");
const app = express();

//Stat and utility import
const { findMean, findMedian, findMode, } = require("./stats");
const { convertStrNums } = require("./utils");

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {
  if (req.query.nums === undefined) throw new BadRequestError("nums are required");

  let mean;

  try {
    const nums = convertStrNums(req.query.nums.split(","));
    mean = findMean(nums);
  } catch (err) {
    throw new BadRequestError(`${err.message}`);
  }

  return res.json({ "operation": "mean", "value": mean })
});

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function(req, res) {
  if (req.query.nums === undefined) throw new BadRequestError("nums are required");

  let median;

  try {
    const nums = convertStrNums(req.query.nums.split(","));
    median = findMedian(nums);
  } catch (err) {

    //FIXME: don't need to throw another error, will be handled by error handler
    throw new BadRequestError(`${err.message}`);
  }

  return res.json({ "operation": "median", "value": median })
});

/** Finds mode of nums in qs: returns {operation: "mode", result } */
app.get("/mode", function(req, res) {
  if (req.query.nums === undefined) throw new BadRequestError("nums are required");

  let mode;

  try {
    const nums = convertStrNums(req.query.nums.split(","));
    mode = findMode(nums);
  } catch (err) {
    throw new BadRequestError(`${err.message}`);
  }

  return res.json({ "operation": "mode", "value": mode })
});



/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;