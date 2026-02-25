const asyncHandler=(fn)=>(req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch(next);

}

const errorHandler=(err,req,res,next)=>{

    console.error(err.stack);

    const statusCode=err.statusCode || 500;
    res.status(statusCode).json({
        message:err.messgae || "something went wrong"
    });
};

const notFound=(req,res,next)=>{

    const err=new Error(`Route ${req.OriginalUrl} not found`);
    err.statusCode=404;
    next(err);
};

module.exports={asyncHandler,errorHandler,notFound};