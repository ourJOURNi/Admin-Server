const config                  = require("config");
const express                 = require("express");
const app                     = express();
const mongoose                = require("mongoose");
const passport 	              = require('passport');
const cors                    = require('cors');
const dotenv                  = require('dotenv');

// Admin Routes
const adminLoginRoute        = require("./routes/login.route");
const adminPhotoRoute        = require("./routes/photo.route");
const adminJobsRoute         = require("./routes/jobs.route");
const adminStudentsRoute     = require("./routes/students.route");
const adminMentorsRoute      = require("./routes/mentor.route");
const adminEventsRoute       = require("./routes/events.route");
const adminPostsRoute        = require("./routes/posts.route");

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

// Admin
app.use("/api/admin/", adminLoginRoute);
app.use("/api/admin/photo", adminPhotoRoute);
app.use("/api/admin/jobs", adminJobsRoute);
app.use("/api/admin/students", adminStudentsRoute);
app.use("/api/admin/mentors", adminMentorsRoute);
app.use("/api/admin/events", adminEventsRoute);
app.use("/api/admin/posts", adminPostsRoute);


const port = process.env.PORT || 5000;
server = app.listen(port, () => {
  console.log('Starting Admin Server\n');
  console.log(`Listening on port ${port}...`)
});
