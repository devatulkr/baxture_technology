const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnalysisTaskSchema = new Schema(
  {
    taskId: { type: String, required: true  },
    countWords: { type: Number  },
    countUniqueWords: { type: Number  },
    findTopKWords: [{ type: String  }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("analysis_datas", AnalysisTaskSchema);