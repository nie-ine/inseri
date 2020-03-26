const express = require("express");
const File = require("../models/files");
const router=express.Router();
const multer=require("multer");

const storage= multer.diskStorage({
  destination: (req,file, cb) => {
    cb(null, "backend/files");
  },
  filename: (req,file,cb) => {
    //console.log(" storage file id "+ file._id);
    const name=file.originalname;//req.file._id+"_"
    //const normalizedName=name.toLowerCase().split(' '),
    let lastDotPos= file.originalname.lastIndexOf('.')
    const ext = file.originalname.substr(lastDotPos+1,file.originalname.length-lastDotPos);//MIME_TYPE_MAP[file.originalname.mimeType];
    cb( null, Date.now()+"-"+ name);
  }
});

router.post('',multer({storage: storage}).single("file") ,(req, res, next) => { ///multer fn that expect a single file from the incoming req and will try to find an file property in the req body
  const url=req.protocol +"://"+req.get("host");
  const file = new File({
    title: req.body.title,
    description: req.body.description,
    urlPath: url+"/files/"+req.file.filename
  });
  //console.log("Router post " + storage.getDestination + storage.getFilename());
  file.save().then(createdFile => {
    //console.log("post route" + file._id + " "+ storage.getFilename());
    res.status(201).json({
      message: "File added successfully",
      file:{
        id: createdFile._id,
        title: createdFile.title,
        description: createdFile.description,
        urlPath: createdFile.urlPath
        // ...createdFile, // spread opr to copy all properties of an obj and add/override some selected properties
        // id: createdFile._id,
      }
    });
    //console.log(storage.getFilename());
  });
});

router.put("/:id", (req, res, next) => {
  const file = new File({
    _id: req.body.id,
    title: req.body.title,
    description: req.body.description
  });
  File.updateOne({ _id: req.params.id }, file).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});

router.get("", (req, res, next) => {
  File.find().then(documents => {
    res.status(200).json({
      message: "Files fetched successfully!",
      file: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  File.findById(req.params.id).then(file => {
    if (file) {
      res.status(200).json(file);
    } else {
      res.status(404).json({ message: "file not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  File.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "file deleted!" });
  });
});

module.exports = router;
