const mongoose = require('mongoose');

const URI='mongodb://fabian:12345@localhost:27020/mydatabase?authSource=admin';

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;
