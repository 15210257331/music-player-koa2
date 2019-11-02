const mongoose = require('../utils/db');

const projectSchema = new mongoose.Schema({
    name : String,
    content : String,
    userId: String,
    task: []
});

module.exports = mongoose.model('projects',projectSchema);
