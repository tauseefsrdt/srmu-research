const { Schema } = require("mongoose");
 
const PatentSchema = new Schema({
  srNo: Number,
  patenterName: String,
  patentNumber: String,
  title: String,
  yearOfAward: String,
});

module.exports = { PatentSchema };