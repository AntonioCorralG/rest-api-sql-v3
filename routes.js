'use strict';

const express = require('express');

// Construct a router instance.
const router = express.Router();
const User = require('./models').User;

// Handler function to wrap each route.
function asyncHandler(cb) {
    return async (req, res, next) => {
      try {
        await cb(req, res, next);
      } catch (error) {
        // Forward error to the global error handler
        next(error);
      }
    }
  }
  