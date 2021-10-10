const mongoose = require('mongoose');

const todoShema = mongoose.Schema({
    done: {type: 'boolean', required: true, default: false},
    todo: {type: 'String', required: true}
});

module.exports = mongoose.model('todo',todoShema);