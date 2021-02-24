const config                  = require("config");
const express                 = require("express");
const app                     = express();
const mongoose                = require("mongoose");
const passport 	              = require('passport');
const cors                    = require('cors');
const dotenv                  = require('dotenv');

// User Routes
const landingRoute           = require("./routes/landing.route");
const signupRoute            = require("./routes/signup.route");
const loginCredentialsRoute  = require("./routes/login-credentials");
const userRoute              = require("./routes/user.route");
const photoRoute             = require("./routes/photo.route");
const resumeRoute            = require("./routes/resume.route");
const jobRoute               = require("./routes/job.route");
const eventRoute             = require("./routes/events.route");
const mentorRoute            = require("./routes/mentors.route");
const postRoute              = require("./routes/posts.route");
const notificationsRoute     = require("./routes/notifications.route");


// Admin Routes
const adminLoginRoute        = require("./routes/admin/login.route");
const adminPhotoRoute        = require("./routes/admin/photo.route");
const adminJobsRoute         = require("./routes/admin/jobs.route");
const adminStudentsRoute     = require("./routes/admin/students.route");
const adminMentorsRoute      = require("./routes/admin/mentor.route");
const adminEventsRoute       = require("./routes/admin/events.route");
const adminPostsRoute        = require("./routes/admin/posts.route");

// Configure Environment Variables
dotenv.config();

// Initiate Socket.IO Config

console.log(process.env.DB_HOST_DEV)


// use config module to get the privatekey, if no private key set, end the application
if (!config.get("jwtSecret")) {
  console.error("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}

// config and connect to mongodb
// console.log('Attempting connection to Mongo Atlas...');
console.log('Connecting via Mongoose to host: ');

mongoose
  // For DeprecationWarning:  collection.ensureIndex is deprecated.  Use createIndexes instead.

  .set('useCreateIndex', true)
  .set('useFindAndModify', false)

  .connect(process.env.DB_HOST_DEV, { useNewUrlParser: true, useUnifiedTopology: true })

  .then(() => console.log("Connected to MongoDB...\n"))

  .catch(err =>
    console.error(err))
// // Use the passport package in our application
app.use(passport.initialize());
var passportMiddleware = require('./middleware/passport');
passport.use(passportMiddleware);

app.use(cors());
app.use(express.json());

app.use("/api/", landingRoute);
// Signup
app.use("/api/login-credentials", loginCredentialsRoute);
app.use("/api/signup", signupRoute);
app.use("/api/home/user", userRoute);
// app.use("/api/home/jobs", profileRoute);
app.use("/api/photo", photoRoute);
app.use("/api/resume", resumeRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/mentors", mentorRoute);
app.use("/api/events", eventRoute);
app.use("/api/posts", postRoute);
app.use("/api/notifications", notificationsRoute);

// Admin
app.use("/api/admin/", adminLoginRoute);
app.use("/api/admin/photo", adminPhotoRoute);
app.use("/api/admin/jobs", adminJobsRoute);
app.use("/api/admin/students", adminStudentsRoute);
app.use("/api/admin/mentors", adminMentorsRoute);
app.use("/api/admin/events", adminEventsRoute);
app.use("/api/admin/posts", adminPostsRoute);


const port = process.env.PORT || 3000;
server = app.listen(port, () => {
  console.log('Starting FYF Server\n');
  console.log(`Listening on port ${port}...`)
});