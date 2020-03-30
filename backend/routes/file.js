const express = require("express");
const File = require("../models/files");
const router=express.Router();
const multer=require("multer");
const checkAuth = require('../middleware/check-auth');
const fs=require('fs');

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

router.post('',checkAuth,multer({storage: storage}).single("file") ,(req, res, next) => { ///multer fn that expect a single file from the incoming req and will try to find an file property in the req body
  const url=req.protocol +"://"+req.get("host");
  const file = new File({
    title: req.body.title,
    description: req.body.description,
    urlPath: url+"/files/"+req.file.filename,
    owner:req.userData.userId
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
  })
    .catch(error => {
    res.status(500).json({
      message: 'Creating file failed',
      error: error
    })
  });
});

router.put("/:id",checkAuth, (req, res, next) => {
  const file = new File({
    _id: req.body.id,
    title: req.body.title,
    description: req.body.description
  });
  File.updateOne({ _id: req.params.id, owner: req.userData.userId }, file).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});

router.get("",checkAuth, (req, res, next) => {
  File.find({owner: req.userData.userId}).then(documents => {
    res.status(200).json({
      message: "Files fetched successfully!",
      files: documents
    });
  }).catch(error => {
    res.status(500).json({
      message: 'Fetching files failed',
      error: error
    })
  })
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
  File.findById(req.params.id).then(file => {
    if (file){
      console.log("file. filePath =  "+file.urlPath);
      //console.log("new generated path ="+ req.protocol +"://"+req.get("host")+"/files/"+file.title);
      fs.unlink(file.urlPath,(err)=>{if(err) console.log(err); else console.log("file deleted from the server successfully.");});
      File.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ message: "file deleted!" });
      });
    }
  });

  /*File.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "file deleted!" });
  });*/
});

module.exports = router;
