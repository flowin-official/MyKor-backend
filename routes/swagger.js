'use strict';
import dotenv from 'dotenv';
dotenv.config();

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const IP = process.env.IP_ADDRESS;

const setupSwagger = (app, serverPort) => {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'MyKor-beta API',
        version: '1.0.0',
        description: 'API documentation for the MyKor application',
      },
      servers: [
        {
          url: `http://${IP}:${serverPort}/mykor/api/v1`,
        },
      ],
    },
    apis: ['./controller/handler/user-handler.js', './controller/system.js','./controller/user-repository.js'],
  };

  const specs = swaggerJsdoc(options);
  app.use('/mykor/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

export { setupSwagger };