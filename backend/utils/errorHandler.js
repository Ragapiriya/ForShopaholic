//creating a common class for handling errors
class ErrorHandler extends Error{ //ErrorHandler- user-made one       Error is predefined class that does error related works.
    constructor(message,statusCode){
        super(message,statusCode); //passing values to parent class constructor to set error message in Parent class "Error"
        this.statusCode=statusCode;
        Error.captureStackTrace(this,this.constructor); //it will expose from where the error comes
    }
}

module.exports = ErrorHandler;