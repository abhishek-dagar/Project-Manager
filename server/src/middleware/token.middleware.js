import JsonWebToken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import managerModel from "../models/manager.model.js";
import memberModel from "../models/member.model.js";

const tokenDecode = (req) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];


      return JsonWebToken.verify(token, process.env.TOKEN_SECRET);
    }
    return false;
  } catch {
    return false;
  }
};

const auth = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);

  if (!tokenDecoded) return responseHandler.unauthorized(res);
  
  const manager = await managerModel.findById(tokenDecoded.data);
  const member = await memberModel.findById(tokenDecoded.data);
  
  if (!member && !manager) return responseHandler.unauthorized(res);
  
  req.user = manager?manager:member?member:null;

  next();
};

export default {
  auth,
  tokenDecode,
};
