
const multer = require("multer");
const fs = require('fs');



const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb)=>{
  if(file.mimetype.startsWith("image")){
    cb(null, true);
  }else{
    cb(new Error("Can upload images only"), false);
  }

};

const upload = multer({
  storage : multerStorage,
  fileFilter : multerFilter
});

exports.uploadPhoto = upload.single("photo");

const extension = (req)=>req.file.originalname.split('.').pop();
exports.extension = extension;

exports.saveImage =(folder,data,req,res,next)=>{
    fs.writeFile(`images/${folder}/${data._id}.${extension(req)}`, req.file.buffer, err => {
      if (err) 
        next(Error("Can't save your photo"));
      else
        res.status(201).json(
      {status: "success"}
          );
      
    });
  }