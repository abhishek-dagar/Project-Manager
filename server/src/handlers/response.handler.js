// Converting to json and sending back
const responseWithData = (res, statusCode, data) => {
  res.status(statusCode).json(data);
};

// For error having status code 500
const error = (res) =>
  responseWithData(res, 500, {
    status: 500,
    message: "Oops! Something wrong!",
  });

const badRequest = (res, message) =>
  responseWithData(res, 400, {
    status: 400,
    message,
  });

const ok = (res, data) => responseWithData(res, 200, data);

const created = (res, data) => responseWithData(res, 201, data);

const unauthorized = (res) =>
  responseWithData(res, 401, {
    status: 401,
    message: "Unauthorized",
  });

const notfound = (res) =>
  responseWithData(res, 404, {
    status: 404,
    message: "Resource not found",
  });

export default {
  error,
  badRequest,
  ok,
  created,
  unauthorized,
  notfound,
};
