//“This is the shape my API promises — and I will enforce it.”
//use zod if u want to force this shape (constraints ) at run time also- but as the backend is self owned api data will be trusted
//we need only hints while writing no run time error throw
export interface message{
    content: string,
    createdAt? : Date,
};

export interface ApiResponse{
    success: boolean,
    message: string,
    isAcceptingMesseges? : boolean,
    messages? : message[],
}