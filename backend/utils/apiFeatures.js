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
        this.query.find({...queryStringCopy}); // Spread the queryStringCopy into the find method
        return this; // Returning object
    }
}

module.exports = APIfeatures;
