const app = require('./src/app');

const port = 3300;

app.listen(port, () =>{
    console.log('Aplicação executando na porta ',port);
});