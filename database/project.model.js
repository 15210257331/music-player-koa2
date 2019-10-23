const mongoose = require('./db');

const projectSchema = new mongoose.Schema({
    name : String,
    content : String,
    mission: Array,
    userId: String
});

module.exports = mongoose.model('projects',projectSchema);
