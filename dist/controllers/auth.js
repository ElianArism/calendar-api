"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renew = exports.login = exports.signup = void 0;
const User_1 = __importDefault(require("../db/models/User"));
const encryption_1 = require("../utils/encryption");
const jwt_1 = require("../utils/jwt");
const response_generation_1 = require("../utils/response-generation");
const signup = async (req, res) => {
    const { email, password, username } = req.body;
    try {
        const user = new User_1.default({
            email,
            password,
            username,
        });
        const userExists = await User_1.default.findOne({
            $or: [{ email }, { username }],
        });
        if (userExists) {
            const logs = `There is another user with this ${email === userExists.email
                ? `email: "${email}"`
                : `username: "${username}"`}`;
            return res
                .status(400)
                .json((0, response_generation_1.GenerateErrorResponse)("User already exists" /* userAlreadyExists */, logs));
        }
        user.password = (0, encryption_1.EncryptString)(user.password);
        await user.save();
        const result = await _GenerateJWTProcess(user, res);
        if (typeof result !== "string")
            return result;
        return res.json((0, response_generation_1.GenerateSuccessResponse)({
            username,
            _id: user._id,
            jwt: result,
        }));
    }
    catch (error) {
        return res
            .status(500)
            .json((0, response_generation_1.GenerateErrorResponse)("Internal server error" /* internalServerError */, error));
    }
};
exports.signup = signup;
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User_1.default.findOne({ email });
    if (!user) {
        return res
            .status(400)
            .json((0, response_generation_1.GenerateErrorResponse)("User not exists with this email / password" /* userNotExists */));
    }
    if (!(0, encryption_1.AreEncriptedStringsEquals)(password, user.password)) {
        return res
            .status(400)
            .json((0, response_generation_1.GenerateErrorResponse)("Incorrect password" /* incorrectPassword */));
    }
    const result = await _GenerateJWTProcess(user, res);
    if (typeof result !== "string")
        return result;
    return res.json((0, response_generation_1.GenerateSuccessResponse)({
        token: result,
        username: user.username,
        _id: user._id,
    }));
};
exports.login = login;
const renew = async (req, res) => {
    const { _id, username } = req;
    const result = await _GenerateJWTProcess({ _id, username }, res);
    if (typeof result !== "string")
        return result;
    return res.json((0, response_generation_1.GenerateSuccessResponse)({
        token: result,
        username,
        _id,
    }));
};
exports.renew = renew;
async function _GenerateJWTProcess(user, res) {
    const { error, jwt } = await (0, jwt_1.GenerateJWT)(user._id, user.username);
    if (error) {
        return res
            .status(500)
            .json((0, response_generation_1.GenerateErrorResponse)(error.message, error.logs));
    }
    return jwt;
}
//# sourceMappingURL=auth.js.map