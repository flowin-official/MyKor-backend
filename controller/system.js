'use strict';
import { consoleBar, timeLog } from "../config/common.js";

// -------------ping---------------
/**
 * @swagger
 * /ping:
 *   get:
 *     summary: 핑퐁
 *     description: 연결 신호 확인용 핑.
 *     responses:
 *       200:
 *         description: Ping successful
 */
// -------------ping---------------

const ping = (req, res) => {
  const result = true;
  res.send({ result });
  consoleBar();
  timeLog('GET ping called');
};

export { ping };