const handles = {
  resSuccess(res, code, status, data) {
    res.status(code).json({
      status: status,
      data: data
    })
  },
  appError(httpStatus, next, errMessage) {
    const errorStatusCode = {
      205: 'Reset Content',
      401: '請重新登入',
      40001: '無對應資料',
      40002: '無此 ID',
      40003: errMessage,
      40004: '資料必須為物件',
      404: '無此要求'
    };
    const error = new Error(errorStatusCode[httpStatus]);
    if (httpStatus >= 40000 && httpStatus <= 49999) {
      httpStatus = 400;
    }
    error.status = httpStatus;
    error.isOperational = true;
    next(error);
  }
}
module.exports = handles;
