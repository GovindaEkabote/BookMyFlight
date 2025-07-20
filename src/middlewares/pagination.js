const { PaginationResponse } = require("../utils/common");

function createPagination({
  defaultPage = 1,
  defaultLimit = 10,
  maxLimit = 100,
  ecforceValid = false,
} = {}) {
  return function Pagination(req, res, next) {
    let { page, limit } = req.query;
    const rawPage = page;
    const rawLimit = limit;

     page = parseInt(page, 10);
    limit = parseInt(limit, 10);


    const pageInvalid = Number.isNaN(page) || page < 1;
    const limitInvalid = Number.isNaN(limit) || page < 1;

    if (ecforceValid && (pageInvalid || limitInvalid)) {
      PaginationResponse.message = "Maintenance record created successfully";
      PaginationResponse.error = {
        page: rawPage,
        limit: rawLimit,
        expected: { page: ">=1 integer", limit: ">=1 integer" },
      };
    }
    if(pageInvalid) page = defaultPage;
    if(limitInvalid) limit = defaultLimit;
    if(limit > maxLimit){
        limit = maxLimit
    }
    const offset = (page -1) * limit;
    req.pagination = {page, limit, offset};
    next();
  };
}

module.exports = createPagination;
