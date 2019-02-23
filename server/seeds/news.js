const mongoose = require('mongoose')
const data = require('./news_data')
const News = require('../ models/news')

// return console.log(data)
// Connect to db
mongoose.connect('mongodb://localhost:27017/news_app', { useNewUrlParser: true })


var done = 0
for(var i = 1; i < data.length; i++){
  createArticle(data[i],function(done){
    if (done === data.length){
      exit()
    }
  })
}

function createArticle (article, cb) {
  const newArticle = new News(article)
  newArticle.save(function(err, res){
    cb(done++)
  });
}

function exit(){
  mongoose.disconnect()
  process.exit(0);
}