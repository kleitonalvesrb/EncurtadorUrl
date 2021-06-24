const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    // connectionString : process.env.DATABASE_URL
    connectionString : "postgres://embyjrlaecqbwz:f307a929283d81ed859f7a1cb7dc39ff58b451ff33ac8e65195b977e0d34a212@ec2-35-169-188-58.compute-1.amazonaws.com:5432/daucppg3amgrib",
    ssl: {
        rejectUnauthorized: false
      }
});

pool.on('connect', () =>{
    console.log('Base de dados conectada com sucesso!');
});

module.exports = {
    query : (text, params) => pool.query(text,params),
};