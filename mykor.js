'use strict';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import config from './config/config.js';
import { consoleBar, timeLog } from './config/common.js';
import { setupRoutes } from './routes/routes.js';
import { setupSwagger } from './routes/swagger.js';

// ------------------ router set -----------------

const IP = process.env.IP_ADDRESS;
const serverPort = config.SERVER_PORT;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// -------------------- route --------------------

setupRoutes(app);
setupSwagger(app, serverPort);

// ---------------- server start -----------------

app.listen(serverPort, () => {
  consoleBar();
  timeLog('Test Server Started');
  timeLog(`Swagger UI available at http://${IP}:${serverPort}/mykor/api-docs`);
});