const mongoose = require('mongoose');

let JobSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 80
  },
  companyName: {
    type: String,
    maxlength: 80
  },
  companyEmail: {
    type: String,
    maxlength: 80
  },
  companyLogo: {
    type: String
  },
  summary: {
    type: String,
  },
  fullJobDescription: {
    type: String,
  },
  rateOfPay: {
    type: Number
  },
  dateCreated: {
    type: Date
  }
});

module.exports = Job = mongoose.model('Job', JobSchema);