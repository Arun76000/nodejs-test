const response = (res, statusCode, msg = '', data = null) => {
    res.status(statusCode).json({
        response: !((statusCode && statusCode >= 400)),
        message: msg,
        data: data || undefined,
    });
};

const catchAsync = (handleFunction) => async (req, res, next) => {
    handleFunction(req, res, next)
        .catch((error) => {
            response(res, 500, error.message);
            return ;
        });
};

const paginate = async (requestQuery) => {
    const page = parseInt(requestQuery.page, 10) || 1;
    const limit = parseInt(requestQuery.limit, 10) || 10;
    const skip = (page - 1) * limit;
    return { page, skip, limit };
};

module.exports = {
    response,
    catchAsync,
    paginate
};