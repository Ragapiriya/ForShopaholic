class APIfeatures {
    constructor(query,queryString) {
        this.query = query;
        this.queryString=queryString;
        
    }
    search(){
        let keyword = this.queryString.keyword ? {
            name:{
                $regex : this.queryString.keyword,
                $options : 'i'  //case insensitive
            }} : {};

        this.query.find({...keyword})
        return this;
    }
}

module.exports=APIfeatures;