const { model } = require('mongoose');

const { PatentSchema } = require('../Schemas/PatentsSchema');

const PatentModel = model('Patent', PatentSchema);

module.exports = { PatentModel };