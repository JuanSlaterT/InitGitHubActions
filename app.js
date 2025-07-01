require('dotenv').config();
global.appRoot = __dirname.replace(/\\/g, '/');

const moment = require('moment-timezone');
moment.tz.setDefault(process.env.TIMEZONE);

const express = require('express');
const cors = require('cors');

const logger         = require('./config/logger');
const routes         = require('./config/routes');
const { handlerErrors } = require('./config/handler');

logger.info('Starting server...');

const app = express();

const swaggerUi   = require('swagger-ui-express');
const swaggerFile = require('./swagger_output_arquetipo.json');

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

/* ────────────────  CORS completamente abierto  ──────────────── */
app.use(cors());           // ← esto ya envía Access-Control-Allow-Origin: *
app.options('*', cors());  // ← responde a los preflight OPTIONS
/* ────────────────────────────────────────────────────────────── */

app.use(express.json());

app.use('/api', routes.v1);
app.use(handlerErrors);

/* 404 */
app.use((req, res) =>
  res.status(404).json({ status: 'ERROR', message: 'Página no encontrada' })
);

module.exports = app;
