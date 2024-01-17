const express = require('express');
const mainController = require('../controller/mainController');
const { uploadTextFile, multerErrorHandler } = require('../utils/multerMethods');

/*-----------------Routes Init----------------*/
const routes = express.Router();
/*-----------------Routes Section----------------*/
routes.post('/upload-text-files', uploadTextFile, multerErrorHandler,  mainController.uploadTextFiles);
routes.post('/analyze',  mainController.analyzeData);
routes.post('/result',  mainController.resultUsingTaskId);

/*------------------------------*/
module.exports = routes;