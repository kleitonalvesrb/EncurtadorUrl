const express = require('express');
const cors = require('cors');

const app = express();

const index = require('./router/index');
const urlRoute = require('./router/url.router');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output.json');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));


app.use(cors());
app.use(index);
app.use('/api/',urlRoute);

const option = {
    definition :{
        openapi: "3.0.0",
        info : {
            title : "Encurtador de URL",
            version : '1.0.0',
            description : "Encurtador de url"
        }
    },
    servers :[
        {
            url: "http://localhost:3300/api",
        },
    ],
    apis : ["./index.js"]
};


const specs = swaggerJsdoc(option);
app.use('/api-docs', 
        swaggerUi.serve, 
        swaggerUi.setup(swaggerFile));


module.exports = app;