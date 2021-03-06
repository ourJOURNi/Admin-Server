const Mentor = require('../models/mentor.model');
const nodemailer = require('nodemailer');

exports.getMentors = (req, res) => {
  console.log('Getting all Mentors');

  Mentor.find((err, mentor) => {
    if (err) return res.status(400).json('Error finding jobs');

    if(!mentor) return res.status(400).json('There are no mentors');

    return res.send(mentor);
  });
}

exports.addMentor = (req, res) => {
  let mentor = req.body
  ;
  console.log(mentor);
  let newMentor = Mentor(mentor);

  newMentor.save( (err, mentor) => {
    if ( err ) {
      return res.status(400).send('There was an error saving the mentor to the database: \n\n' + err);
    }
    console.log('Added Mentor: ' + mentor);
    return res.status(200).send(mentor);
  })
}

exports.updateMentor = (req, res) => {

  let updatedMentor = req.body;
  let condition = { _id: req.body._id };

  Mentor.updateOne(condition, updatedMentor, (err, mentor) => {
    if ( err ) {
      return res.status(400).send('There was an error updating the mentor in the database: \n\n' + err);
    }

    console.log('Updated Mentor: ' + mentor);
    return res.status(200).send(mentor);
    }
  )
}

exports.deleteMentor = (req, res) => {

  Mentor.findByIdAndDelete( req.params._id, (err) => {
    if (err) return err;
  } );
  console.log(req);
  console.log(req.params._id + ' Mentor deleted');
  res.status(200).json(req.params._id + ' Mentor deleted');
}

