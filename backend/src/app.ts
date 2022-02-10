import path from "path";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/user";
import actionRoutes from "./routes/action";
import pageSetRoutes from "./routes/page-set";
import pageRoutes from "./routes/page-route";
import messageRoutes from './routes/message';
import queryRoutes from './routes/query';
import myOwnJsonRoutes from './routes/myOwnJson';
import userGroupRoutes from './routes/userGroups';
import subPageRoutes from './routes/sub-page';
import folderRoutes from './routes/folder';
import fileRoutes from './routes/file';
import commentRoutes from "./routes/comment";
import microServices from './routes/microservice';

const {MONGO_DB} = process.env;
const app = express();

mongoose
  .connect(
    MONGO_DB
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


export default app;
