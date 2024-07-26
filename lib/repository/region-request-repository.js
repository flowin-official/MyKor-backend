'use strict';
import dotenv from 'dotenv';
dotenv.config();

import { regionRequest } from '../model/region-request-model.js';
import { connection } from '../connect.js';

const postRegionRequest = async (results, nation, region) => {
  try {
    await connection;
    try {
      const newRegionRequest = new regionRequest({ nationName: nation, regionName: region});
      await newRegionRequest.save();
    } catch (err) {
      results.result = false;
      results.error.push("Repository Error");
    }
  } catch (err) {
    results.result = false;
    results.error.push('DB connection Error');
  }
};

export { postRegionRequest };