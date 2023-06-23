"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jwt_1 = require("../utils/jwt");
const response_generation_1 = require("../utils/response-generation");
const validateJWT = async (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res
            .status(401)
            .json((0, response_generation_1.GenerateErrorResponse)("Token not founded in request" /* ApiErrorMessages.missingToken */));
    }
    try {
        const { uid, username } = (0, jwt_1.ValidateJsonWebToken)(token);
        req._id = uid;
        req.username = username;
    }
    catch (error) {
        return res
            .status(401)
            .json((0, response_generation_1.GenerateErrorResponse)("Invalid token" /* ApiErrorMessages.invalidToken */));
    }
    next();
};
exports.validateJWT = validateJWT;
//# sourceMappingURL=validate-jwt.js.map