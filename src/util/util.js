/**
 * 
 * @module Util
 */

/**
 * Cria uma cadeia de caracter de 5 posição de forma aleatória com base no padrão disponível
 * essa cadeia será utilizada como a url encurtada.
 * @returns {String}
 */
exports.criaUrlEncurtada = function(){
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
