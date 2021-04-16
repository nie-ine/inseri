const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const actionRoutes = require("./routes/action");
const pageSetRoutes = require("./routes/page-set");
const pageRoutes = require("./routes/page-route");
const messageRoutes = require('./routes/message');
const queryRoutes = require('./routes/query');
const myOwnJsonRoutes = require('./routes/myOwnJson');
const userGroupRoutes = require('./routes/userGroups');
const subPageRoutes = require('./routes/sub-page');
const folderRoutes = require('./routes/folder');
const fileRoutes = require('./routes/file');
const commentRoutes = require("./routes/comment");
const microServices = require('./routes/microservice');

const app = express();

const mongodbServer = require('./.settings/mongodbServer');

var cors = require('cors');

mongoose
  .connect(
    mongodbServer.mongodbServer
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use( bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/files", express.static(path.join("backend/files")));
app.use("/Downloads", express.static(path.join("backend/Downloads")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.use("/api/users", userRoutes);
app.use("/api/actions", actionRoutes);
app.use("/api/pagesets", pageSetRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/queries", queryRoutes);
app.use("/api/myOwnJson", myOwnJsonRoutes);
app.use("/api/userGroups", userGroupRoutes);
app.use("/api/sub-page", subPageRoutes);
app.use("/api/folder", folderRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/microservices", microServices);


module.exports = app;
