class APIfeatures { 
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    search() {  // Search functionality
        let keyword = this.queryString.keyword ? {  // Object
            name: {
                $regex: this.queryString.keyword,
                $options: 'i'  // Case insensitive
            }} : {};

        this.query.find({...keyword});
        return this; // Returning object
    }

    filter() {
        const queryStringCopy = {...this.queryString};
        // Removing fields
        const removeFields = ['keyword', 'limit', 'page']; // The array contains fields that need to be removed to get 'category' field
        removeFields.forEach(field => delete queryStringCopy[field]);
        // After removing fields from query
        console.log("Filtered Query params: ",queryStringCopy);


        if(queryStringCopy.category){
            queryStringCopy.category = {
                 $regex: queryStringCopy.category,
                  $options: 'i' }; 
        }

        let queryString = JSON.stringify(queryStringCopy); //to add $ sign
        queryString = queryString.replace(/\b(gt|gte|lt|lte)/g, match => `$${match}`);

        console.log("Filtered Query params for price : ",queryString);




        // this.query.find({...queryStringCopy}); // input the queryStringCopy into the find method
        this.query.find(JSON.parse(queryString)) //change string into object, then only mongodb can further proceed
        return this; // Returning object
    }

    paginate(resultPerPage)
    {
        const currentPage = Number(this.queryString.page) || 1;
        const skip = resultPerPage * currentPage -1
    }
}

module.exports = APIfeatures;
