class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // Search functionality
  search() {
    let keyword = this.queryString.keyword
      ? {
          // Object
          name: {
            $regex: this.queryString.keyword,
            $options: "i", // Case insensitive
          },
        }
      : {}; //empty obj
    // console.log(keyword);
    //searching for "dell"
    //{ name: { '$regex': 'dell', '$options': 'i' } }
    this.query.find({ ...keyword });
    return this; // Returning object
  }

  // filter() {
  //   const queryStringCopy = { ...this.queryString };
  //   //before removing fields
  //   console.log("Before filtering query params: ", queryStringCopy);
  //   // Removing fields
  //   const removeFields = ["keyword", "limit", "page"]; // The array contains fields that need to be removed to get 'category' field
  //   removeFields.forEach((field) => delete queryStringCopy[field]);
  //   // After removing fields from query
  //   console.log("Filtered Query params: ", queryStringCopy);

  //   if (queryStringCopy.category) {
  //     queryStringCopy.category = {
  //       $regex: queryStringCopy.category,
  //       $options: "i",
  //     };
  //   }
  //   this.query.find(queryStringCopy);

  //   let queryString = JSON.stringify(queryStringCopy); //to add $ sign
  //   queryString = queryString.replace(
  //     /\b(gt|gte|lt|lte)/g,
  //     (match) => `$${match}`
  //   );

  //   console.log("Filtered Query params for price : ", queryString);

  //   // this.query.find({...queryStringCopy}); // input the queryStringCopy into the find method
  //   // this.query.find(JSON.parse(queryString)); //change string into object, then only mongodb can further proceed

  //   const parsedQuery = JSON.parse(queryString);

  //   // Convert price-related values from strings to numbers where applicable
  //   if (parsedQuery.price) {
  //     for (let key in parsedQuery.price) {
  //       parsedQuery.price[key] = parseInt(parsedQuery.price[key]);
  //     }
  //   }
  //   console.log("parsedQuery ", parsedQuery);

  //   console.log("parsedQuery price", parsedQuery.price);
  //   // Apply the parsed query to the Mongoose find query
  //   this.query.find(parsedQuery);

  //   return this; // Returning object
  // }

  filter() {
    const queryStrCopy = { ...this.queryString };
    // console.log(queryStrCopy); //before filtering

    //removing fields from query
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((field) => delete queryStrCopy[field]);
    // console.log(queryStrCopy); //after filtering

    let queryString = JSON.stringify(queryStrCopy);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)/g,
      (match) => `$${match}`
    );
    // console.log(queryString);
    // this.query.find(queryStrCopy);
    this.query.find(JSON.parse(queryString));

    return this;
  }
  // filterPrice()
  // {
  //   const queryStrCopy = { ...this.queryString };
  //   const removeFields = ["category","keyword", "limit", "page"];
  //   removeFields.forEach((field) => delete queryStrCopy[field]);
  //   let queryString = JSON.stringify(queryStrCopy);
  //   queryString = queryString.replace(
  //     /\b(gt|gte|lt|lte)/g,
  //     (match) => `$${match}`
  //   );
  //   this.query.find(JSON.parse(queryString));
  //   return this;
  // }

  paginate(resultPerPage) {
    const currentPage = Number(this.queryString.page) || 1; //if there are no page query paramter, the output will be the products that is intended to shown on the first page.
    const skip = resultPerPage * (currentPage - 1);
    this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = APIfeatures;
