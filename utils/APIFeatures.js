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


module.exports = APIFeatures;