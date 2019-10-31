const mongoose = require('../utils/db');

const projectSchema = new mongoose.Schema({
    name : String,
    content : String,
    task: Array,
    userId: String
});

module.exports = mongoose.model('projects',projectSchema);
