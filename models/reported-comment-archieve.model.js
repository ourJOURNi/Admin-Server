const mongoose = require('mongoose');

const ReportedCommentArchiveSchema = new mongoose.Schema({
  date : {
    type: String
  },
  commentID : {
    type: String
  },
  commentContents : {
    type: String
  },
  postID : {
    type: String
  },
  post : {
    type: String
  },
  userEmail : {
    type: String
  },
  userFullname : {
    type: String
  },
  reportedUserEmail : {
    type: String
  },
  reportedUserName : {
    type: String
  },
  reportedUserProfilePicture : {
    type: String
  },
  reportReason: {
    type: String
  }
})

module.exports = ReportedCommentArchive = mongoose.model('ReportedCommentArchive', ReportedCommentArchiveSchema);