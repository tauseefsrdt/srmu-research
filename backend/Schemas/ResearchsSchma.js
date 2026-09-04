const { Schema } = require("mongoose");


const  ResearchsSchema = new Schema({
  srNo: Number,
  title: String,
  authorName: String,
  department: String,
  journalName: String,
  yearOfPublication: String,
  issnNumber: String,
  ugcRecognitionLink: String,
});

module.exports = { ResearchsSchema };