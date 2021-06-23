const mongoose = require('mongoose');
require('dotenv').config();


exports.connectToDatabase = () => {
  mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(() => console.log('Connected!!!'));
  
  mongoose.connection.on('error',err => {
    console.log(`Connection error: ${err.message}`);
  })
}