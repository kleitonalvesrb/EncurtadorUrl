const router = require('express-promise-router')();
const urlController = require('../controllers/url.controller');

router.post('/urls',urlController.criaUrl);
router.get('/urls', urlController.buscaTodas);
router.get('/url/:id',urlController.buscaUrlId);
router.get('/urlencurtada/:urlencurtada',urlController.buscaUrlEncurtada);
router.get('/urlsdata/:dia/:mes/:ano',urlController.buscaUrlsData)
module.exports = router;