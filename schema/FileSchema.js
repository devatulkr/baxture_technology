const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema(
  {
    fileId: { type: String, required: true  },
    fileName: { type: String, required: true  },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("file_datas", FileSchema);