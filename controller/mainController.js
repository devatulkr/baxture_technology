const Joi = require("joi");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const mainService = require("../service/mainService");
const analyzeFuncation = require("../utils/analyzeFuncation");

exports.uploadTextFiles = async (req, res, next) => {
  try {
    if (!req.file)
      return res.status(400).json({
        statusText: "Failed",
        statusValue: 400,
        message: "Please upload text file.",
      });
    const fileName = req.file.filename;
    let fileId = fileName.replace("file_", "");
    fileId = fileId.replace(".txt", "");
    const resData = await mainService.insertFileData(fileId, fileName);
    if (resData == null)
      res.status(400).json({
        statusText: "Failed",
        statusValue: 400,
        message: "Internal Server Error",
      });

    res.status(200).json({
      statusText: "Success",
      statusValue: 200,
      message: "File Uploaded Successfully",
      data: resData,
    });
  } catch (err) {
    next(err);
  }
};

exports.analyzeData = async (req, res, next) => {
  try {
    const schema = Joi.object({
      fileId: Joi.string().required(),
      countWords: Joi.boolean().required(),
      countUniqueWords: Joi.boolean().required(),
      findTopKWords: Joi.boolean().required(),
      word: Joi.string().allow("").required(),
    });

    const result = schema.validate(req.body);
    if (result.error)
      return res.status(200).json({
        statusText: "Failed",
        statusValue: 400,
        message: result.error.details[0].message,
      });
    const resData = await mainService.getFileData(req.body.fileId);
    if (resData == null)
      res.status(400).json({
        statusText: "Failed",
        statusValue: 400,
        message: "Invalid fileId.",
      });

    const taskId = uuidv4();
    const insertObj = { taskId };

    if (req.body.countWords) {
      let countWords = 0;
      const countWordsRes = analyzeFuncation.countWords(resData.fileName);
      if (countWordsRes.statusValue) {
        countWords = countWordsRes.count;
        insertObj.countWords = countWords;
      } else {
        res.status(400).json({
          statusText: "Failed",
          statusValue: 400,
          message: countWordsRes.error,
        });
      }
    }

    if (req.body.countUniqueWords) {
      let countUniqueWords = 0;
      const countUniqueWordsRes = analyzeFuncation.countUniqueWords(resData.fileName);
      if (countUniqueWordsRes.statusValue) {
        countUniqueWords = countUniqueWordsRes.count;
        insertObj.countUniqueWords = countUniqueWords;
      } else {
        res.status(400).json({
          statusText: "Failed",
          statusValue: 400,
          message: countUniqueWordsRes.error,
        });
      }
    }

    if (req.body.findTopKWords) {
      if(!req.body.word)
      res.status(400).json({
        statusText: "Failed",
        statusValue: 400,
        message: "word is required",
      });
      let findTopKWords = [];
      const findTopKWordsRes = analyzeFuncation.findTopKWords(resData.fileName);
      if (findTopKWordsRes.statusValue) {
        findTopKWords = findTopKWordsRes.topWords;
        insertObj.findTopKWords = findTopKWords;
      } else {
        res.status(400).json({
          statusText: "Failed",
          statusValue: 400,
          message: findTopKWordsRes.error,
        });
      }
    }

    const resData2 = await mainService.insertTaskData(insertObj);
    if (resData2 == null)
      res.status(400).json({
        statusText: "Failed",
        statusValue: 400,
        message: "Interval Server Error.",
      });

    res.status(200).json({
      statusText: "Success",
      statusValue: 200,
      message: "Analysis Initiate.",
      taskId,
    });
  } catch (err) {
    next(err);
  }
};

exports.resultUsingTaskId = async (req, res, next) => {
  try {
    const schema = Joi.object({
      taskId: Joi.string().required(),
    });

    const result = schema.validate(req.body);
    if (result.error)
      return res.status(200).json({
        statusText: "Failed",
        statusValue: 400,
        message: result.error.details[0].message,
      });
    const resData = await mainService.getTaskData(req.body.taskId);
    if (resData == null)
      res.status(400).json({
        statusText: "Failed",
        statusValue: 400,
        message: "Data not Found.",
      });

    res.status(200).json({
      statusText: "Success",
      statusValue: 200,
      message: "Data Found.",
      data: resData,
    });
  } catch (err) {
    next(err);
  }
};
