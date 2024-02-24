


// function globalHandleError message and statusCode
export class AppError extends Error{
constructor(message,statusCode){
super(message)
this.statusCode=statusCode
}
}