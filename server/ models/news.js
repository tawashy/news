
// Organization Model
const mongoose    = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

// schema structure
const newsSchema = mongoose.Schema({
    author: { type: String, required: false },
    title: { type: String, required: true },
    description: { type: String, required: false },
    urlToImage: { type: String, required: false },
    content: {type: String, required: true },
});

newsSchema.plugin(mongoosePaginate);
// creating the model
var news = mongoose.model('News', newsSchema );


// exporting the module..
module.exports = news;