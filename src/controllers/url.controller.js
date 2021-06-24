const db = require('../config/database');
const util = require('../util/util');
/**
 * @module urlController 
 */
/**
 * Resposta do criaUrl
 * @typedef {Object} criaUrl
 * @property {Object} result - Dados da url encurtada
 * 
 */

/**
 * @param {String} urloriginal -- url antes de ser encurtada, exemplo: https://nodejs.org/en/
 * @param {String} urldescricao -- descrição da url que será encurtada, exemplo: Site para download do node js
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns {Promise<criaUrl>}
 */
exports.criaUrl = async (req, res ) =>{
    const {urloriginal,urldescricao} = req.body;
    const urlencurtada = util.criaUrlEncurtada();
    const  {rows} = await db.query(
        "insert into encurtador.url (urlencurtada,urloriginal,urldescricao) values ($1 , $2, $3) returning urlid;",
        [urlencurtada,urloriginal,urldescricao]
    );
    console.log(rows[0].urlid);
    const urlid = rows[0].urlid;
    res.status(201).send({
        message : "Url criada com sucesso!",
        body : {
            url : {urlencurtada,urloriginal, urldescricao,urlid}
        },
    });
}

exports.buscaTodas = async (req, res )=>{
    const response = await db.query("select * from encurtador.url u where urlstatus = true;");
    res.status(200).send(response.rows);
};

exports.buscaUrlId = async (req,res) =>{
    //console.log(req.params.id);
    const  urlId  = req.params.id;
    console.log(urlId)
    const response = await db.query("select * from encurtador.url where urlid = $1", [urlId]);
    res.status(200).send(response.rows);
};
exports.buscaUrlEncurtada = async (req,res) =>{
    const urlEncurtada = req.params.urlencurtada;
    const response = await db.query("select urloriginal from encurtador.url where urlencurtada = $1", [urlEncurtada]);
    console.log(response.rows[0].urloriginal);   
    res.redirect(response.rows[0].urloriginal);    
};

exports.buscaUrlsData = async (req,res) => {
    const {dia,mes,ano} = req.params;
    let data = dia + "/" + mes + "/" + ano;
    const response = await db.query("select * from encurtador.url where to_char(urldatainc,'dd/mm/yyyy') = $1", [data]);
    res.status(200).send(response.rows);
};