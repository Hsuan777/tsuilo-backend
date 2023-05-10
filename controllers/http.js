const {resSuccess, appError} = require('../service/handles');
const http = {
  cors(req, res) {
    resSuccess(res, 'CORS Message');
  },
  notFound(req, res, next) {
    appError(404, next)
  }
}

module.exports = http;
