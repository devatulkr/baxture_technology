const FileSchema = require("../schema/FileSchema");
const AnalysisTaskSchema = require("../schema/AnalysisTaskSchema");

exports.insertFileData = async (fileId, fileName) => {
    try {
        const insertData = await FileSchema({fileId, fileName}).save();
        return insertData;
    } catch (error) {
        return null;
    }
}

exports.getFileData = async (fileId) => {
    try {
        const fileObj = await FileSchema.findOne({fileId});
        return fileObj;
    } catch (error) {
        return null;
    }
}

exports.insertTaskData = async (insertObj) => {
    try {
        const insertData = await AnalysisTaskSchema(insertObj).save();
        return insertData;
    } catch (error) {
        return null;
    }
}

exports.getTaskData = async (taskId) => {
    try {
        const taxtObj = await AnalysisTaskSchema.findOne({taskId});
        return taxtObj;
    } catch (error) {
        return null;
    }
}