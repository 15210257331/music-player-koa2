const mongoose = require('../../common/db');

const typeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    // 0 禁用 1 可用
    status: {
        type: Number,
        required: true,
        default: 1
    }
});

module.exports = mongoose.model('type', typeSchema);
