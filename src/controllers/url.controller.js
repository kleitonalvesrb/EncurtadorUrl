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
 * Responsável por Receber uma URL que deve ser encurtada e salvar no banco.
 * @param {Express.Request} req @description urloriginal, urldescricao
 * @param {Express.Response} res @description dados de url encurtada
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

/**
 * Não precisa de parametros:
 * Retorna todas as URL encurtadas presente na base dados
 * @param {Express.Request} req  @description Sem parametros
 * @param {Express.Response} res @description
 */
exports.buscaTodas = async (req, res )=>{
    const response = await db.query("select * from encurtador.url u where urlstatus = true;");
    res.status(200).send(response.rows);
};

/**
 * Recupera uma ulr encurtada pelo ID
 * @param {Express.Request} req @description id da url
 * @param {Express.response} res @description dados da url
 * @returns {Promise.buscaUrlId}
 */
exports.buscaUrlId = async (req,res) =>{
    //console.log(req.params.id);
    const  urlId  = req.params.id;
    console.log(urlId)
    const response = await db.query("select * from encurtador.url where urlid = $1", [urlId]);
    res.status(200).send(response.rows);
};
/**
 * Redireciona para a URL correta, apartir da url encurtada
 * @param {*} req @description urlencurtada
 * @param {*} res @description redireciona para a url original
 * @returns {Promise.buscaUrlEncurtada}
 */
exports.buscaUrlEncurtada = async (req,res) =>{
    const urlEncurtada = req.params.urlencurtada;
    const response = await db.query("select urloriginal from encurtador.url where urlencurtada = $1", [urlEncurtada]);
    console.log(response.rows[0].urloriginal);   
    res.redirect(response.rows[0].urloriginal);    
};

/**
 * Recupera todas as urls de uma determinada data
 * espera como parametro a data no formado dd/mm/yyyy
 * @param {Express.Request} req @description dia/mes/ano
 * @param {Express.response} res @description lista de urls cadastrada nessa data
 */
exports.buscaUrlsData = async (req,res) => {
    const {dia,mes,ano} = req.params;
    let data = dia + "/" + mes + "/" + ano;
    const response = await db.query("select * from encurtador.url where to_char(urldatainc,'dd/mm/yyyy') = $1", [data]);
    res.status(200).send(response.rows);
};