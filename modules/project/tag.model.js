const mongoose = require('../../common/db');

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('tag', tagSchema);
