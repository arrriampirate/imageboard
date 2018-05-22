const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: String,
    src: String
});

const fileModel = mongoose.model('files', fileSchema);

exports.model = fileModel;