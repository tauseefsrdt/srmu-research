const { model } = require('mongoose');

const { BooksSchema } = require('../Schemas/BooksSchema');

const BooksModel =  new model('Books', BooksSchema);

module.exports = { BooksModel };