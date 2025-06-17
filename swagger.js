const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output_arquetipo.json';
const endpointsFiles = ['./app/routes/pokemon.route.js'];
const doc = require('./swagger.json');

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./server.js');
});
