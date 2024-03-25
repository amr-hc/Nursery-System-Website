const TeacherSchema = require("./../Model/teacherModel");

class APIFeatures{

  constructor(query,queryObject){
    this.query = query;
    this.queryObject = queryObject;
  }

  filter(){
    let notProperty = ["sort","limit","select","skip","page"];

    let queryObject = {...this.queryObject};
    notProperty.forEach(p=> delete queryObject[p]);
    let queryString = JSON.stringify(queryObject);
    queryString= queryString.replace(/\b(gt|gte|lt|lte)\b/g, matched => `$${matched}`)
    queryObject=JSON.parse(queryString);
    this.query  = this.query.find(queryObject);
    return this;
  }

  sort(){
    if(this.queryObject.sort)
      this.query.sort(this.queryObject.sort.replace(/,/g," "));
    return this;
  }
  select(){
    if(this.queryObject.select)
      this.query.select(this.queryObject.select.replace(/,/g," "));
    else
      this.query.select("-__v");
    return this;
  }

  paginate(){
    
    const limit = parseInt(this.queryObject.limit) || 100;
    const page = parseInt(this.queryObject.page) || 1;
    const skip = (page - 1) * limit;
  
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }



}

exports.getAllTeacher=(req,res,next)=>{

    // let notProperty = ["sort","limit","select","skip","page"];

    // let queryObject = {...req.query};
    // notProperty.forEach(p=> delete queryObject[p]);
    // let queryString = JSON.stringify(queryObject);
    // queryString= queryString.replace(/\b(gt|gte|lt|lte)\b/g, matched => `$${matched}`)
    // queryObject=JSON.parse(queryString);
    // let query  = TeacherSchema.find(queryObject);

    // if(req.query.sort)
    //   query=query.sort(req.query.sort.replace(/,/g," "));
    
    // if(req.query.select)
    //   query.select(req.query.select.replace(/,/g," "));
    // else
    //   query.select("-__v");

    // const limit = parseInt(req.query.limit) || 100;
    // const page = parseInt(req.query.page) || 1;
    // const skip = (page - 1) * limit;
  
    // query = query.skip(skip).limit(limit);

    let api = new APIFeatures(TeacherSchema,req.query).filter().sort().select().paginate();

    api.query.then((data)=>{res.status(200).json(data);});
}


exports.getTeacherById = (req, res, next) => {
    TeacherSchema.findOne({_id:req.params.id}).then((data)=>{res.status(200).json(data);})
    
};
exports.cheackID = (req, res, next, val) => {
    if(!isNaN(val)){
      next();
    }else{
      const error = new Error("Invalid id");
      next(error);
    }
    
};

exports.insert = (req, res, next) => {
  //  let object = new TeacherSchema(req.body);
  //  object.save().then((data)=>{res.status(200).json({ data: data })}).catch((error) => next(error));

   TeacherSchema.create(req.body).then((data)=>{res.status(200).json({ data: data })}).catch((error) => next(error));

};

exports.update = (req, res, next) => {
    TeacherSchema.findOneAndUpdate({ _id: req.body._id },req.body).then((data)=>{res.status(200).json(data);}).catch((error) => next(error));
};

exports.supervisors = (req, res, next) => {
    TeacherSchema.aggregate([
        {
          $lookup: {
            from: "classes",
            localField: "_id",
            foreignField: "supervisor",
            as: "class_supervise"
          }
        },
        {
          $match: {
            class_supervise: { $ne: [] } 
          }
        },
        {
            $project: {
            _id: 1,
            fullname: 1,
            email: 1,
            password: 1,
            image: 1
        }
        }]).then((data)=>{res.status(200).json(data)}).catch((error) => next(error))
};
