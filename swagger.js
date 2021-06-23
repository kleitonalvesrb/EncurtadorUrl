const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';

const endpointsFiles = ['./src/router/url.router.js',
                         './src/router/index.js'];

swaggerAutogen(outputFile,endpointsFiles);
/*.then(()=>{
    require('./server.js');
}
)*;*/
            