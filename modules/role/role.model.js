const mongoose = require('../../common/db');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    valid: {
        type: Boolean,
        required: true,
        default: true,
    },
    authority: {
        type: Array,
        default: []
    },
    createDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    updateDate: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('role', roleSchema);
