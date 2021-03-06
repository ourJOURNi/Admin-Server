const Job = require('../models/job.model');

exports.getJobs = (req, res) => {
  console.log('Getting all Jobs');

  Job.find((err, jobs) => {
    if (err) return res.status(400).send('Error finding jobs');
    return res.send(jobs);
  });
}

exports.addJob = (req, res) => {

  let job = req.body.job;
  let logoURL = req.body.logoURL;

  if ( !job.title || !job.companyName || !job.companyEmail || !job.summary || !job.fullJobDescription || !job.rateOfPay ) {
    return res.status(400).send('Please enter a title, company name, company email, summary, full job description, rate of pay, and date created. You are missing one or more fields.');
  }

  // Add Current Date to Post
  job.dateCreated = Date.now();
  let newJob = Job(job);
  newJob.companyLogo = logoURL;


  newJob.save( (err, job) => {
    if ( err ) {
      return res.status(400).send('There was an error saving the job to the database: \n\n' + err);
    }
    console.log('Added Job: ' + job);
    return res.status(200).send(job);
  })
}

exports.updateJob = (req, res) => {
  console.log(req.body.companyLogo);
  
  // if ( !req.body.title || !req.body.companyName || !req.body.companyEmail || !req.body.logoUrl || !req.body.summary || !req.body.fullJobDescription || !req.body.rateOfPay ) {
  //   return res.status(400).send('Please enter a title, company name, company email, summary, full job description, rate of pay, and date created. You are missing one or more fields.');
  // }

  let updatedJob = req.body;
  // console.log(updatedJob);

  let condition = { _id: req.body._id };

  Job.updateOne(condition, updatedJob, (err, job) => {
    if ( err ) {
      return res.status(400).send('There was an error updating the job in the database: \n\n' + err);
    }

    // console.log('Updated Job: ' + job);
    return res.status(200).send(job);
    }
  )
}

exports.deleteJob = (req, res) => {

  Job.findByIdAndDelete( req.params._id, (err) => {
    if (err) return err;
  } );
  console.log(req.params._id + ' Job deleted');
  res.status(200).json(req.params._id + ' Job deleted');
}