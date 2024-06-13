const settings = require('../infrastructure/config/settings');
const express = require('express');
const cors = require('cors');
const connectDatabase = require('../infrastructure/config/databaseConfig');
const { swaggerUi, specs } = require('../infrastructure/swagger/swaggerConfig');
const errorHandler = require('../infrastructure/middlewares/errorHandlerMiddleware');
const routes = require('../infrastructure/routes');
const { errors } = require('celebrate');

class App {
  constructor() {
    this.express = express();
    this.setupMiddlewares();
    this.setupRoutes();

    connectDatabase(settings.db);
  }

  setupMiddlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }

  setupRoutes() {
    this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    this.express.use('/api/v1', routes);
    this.express.use(errorHandler);
    this.express.use(errors());
  }
}

module.exports = new App().express;
