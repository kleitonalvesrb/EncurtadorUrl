const app = require('./src/app');

const port = 3300;

app.listen(process.env.PORT || 3300, () =>{
    console.log('Aplicação executando na porta ',port);
});