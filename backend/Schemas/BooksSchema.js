const { Schema } = require('mongoose');

const BooksSchema = new Schema({
  slNo: Number,
  teacherName: String,
  bookOrChapterTitle: String,
  paperTitle: String,
  conferenceProceedingTitle: String,
  conferenceName: String,
  scope: String,
  yearOfPublication: String,
  isbnIssn: String,
  affiliatingInstitute: String,
  publisherName: String,
});

module.exports = { BooksSchema };