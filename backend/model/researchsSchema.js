const { model } = require('mongoose');

const { ResearchsSchema } = require('../Schemas/ResearchsSchma');

const ResearchsModel =  new model('Researchs', ResearchsSchema);

module.exports = { ResearchsModel };