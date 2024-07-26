'use strict';
import dotenv, { config } from 'dotenv';
dotenv.config();

import { consoleBar, timeLog, resSend } from '../../config/common.js';
import { postRegionRequest } from '../../lib/repository/region-request-repository.js';

// -------------regionReguestHandler---------------
/**
 * @swagger
 * /region-request:
 *   post:
 *     summary: 서비스 지역 요청
 *     description: 초기 진입 페이지에서 서비스 지역 요청
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nation
 *               - region
 *             properties:
 *               nation:
 *                 type: string
 *                 description: 요청 국가
 *                 example: 미국
 *               region:
 *                 type: string
 *                 description: 요청 지역
 *                 example: 오렌지 카운티
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Bad request, invalid input data
 *       404:
 *         description: User not found or no posts associated with the user
 *       500:
 *         description: Internal server error
 *     tags:
 *       - region-request
*/
// -------------regionReguestHandler---------------

const regionReguestHandler = async (req, res) => {
  const results = {};
  results.result = true;
  results.error = [];

  const nation = req.body.nation;
  const region = req.body.region;

  results.request = {
    nation : nation,
    region : region
  }

  try {
    await postRegionRequest(results, nation, region);
  } catch (err) {
    results.result = false;
    results.error.push("Handler Error");
  }
  
  res.send(results);
  consoleBar();
  timeLog('[POST][/region-request] // '+JSON.stringify(req.body)+ ' // ' + JSON.stringify(results));
};

export { regionReguestHandler };