const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

async function dbConnection() {
    try {
      const mongoURI = 'mongodb+srv://interview_user:EVFjPBrmCxZsKMuZ@interview.iyirlwp.mongodb.net/interview';
  
      await mongoose.connect(mongoURI);
  
      console.log('Connected to MongoDB');

    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
    }
  }

module.exports = { dbConnection };
