import managerModel from "../models/manager.model.js";
import memberModel from "../models/member.model.js";
import jsonWebToken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import randomcolor from "randomcolor";

// register new user
const signup = async (req, res) => {
  try {
    const { email, password, displayName, designation } = req.body;
    console.log(req.body);

    const checkUser = await managerModel.findOne({ email });
    if (checkUser) return responseHandler.badRequest(res, "email already use");

    var user = undefined;
    if (designation === "MANAGER") {
      user = new managerModel();
    }
    if (designation === "MEMBER") {
      user = new memberModel();
      user.manager = req.body.id;
    }

    user.displayName = displayName;
    user.email = email;
    user.designation = designation;
    user.avatarColor = randomcolor();
    user.setPassword(password);

    await user.save();

    const token = jsonWebToken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch (err) {
    console.log(err.message);
    responseHandler.error(res);
  }
};

// validate user
const signIn = async (req, res) => {
  try {
    const { email, password, designation } = req.body;

    var user;
    if (designation === "MANAGER") {
      user = await managerModel
        .findOne({ email })
        .select("email password salt id displayname designation");
    }
    if (designation === "MEMBER") {
      user = await memberModel
        .findOne({ email })
        .select("email password salt id displayname designation manager");
    }

    if (!user) return responseHandler.badRequest(res, "user not exists");

    if (!user.validPassword(password))
      return responseHandler.badRequest(res, "wrong password");

    const token = jsonWebToken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    user.password = undefined;
    user.salt = undefined;

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    responseHandler.error(res);
  }
};

// getting user info
const getInfo = async (req, res) => {
  try {
    const manager = await managerModel.findById(req.user.id);
    const member = await memberModel.findById(req.user.id);

    if (!manager && !member) return responseHandler.notfound(res);

    const user = manager ? manager : member ? member : null;

    responseHandler.ok(res, user);
  } catch {
    responseHandler.error(res);
  }
};

const getMemberDetail = async (req, res) => {
  try {
    const { memberId } = req.params;
    const member = await memberModel.findById(memberId);

    if (!member) return responseHandler.notfound(res);

    responseHandler.ok(res, member);
  } catch (err) {
    console.log(err.message);
    responseHandler.error(res);
  }
};

export default {
  signIn,
  signup,
  getInfo,
  getMemberDetail,
};
