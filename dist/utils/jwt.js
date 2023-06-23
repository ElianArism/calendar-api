"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateJsonWebToken = exports.GenerateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const GenerateJWT = (uid, username) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign({ uid, username }, process.env.SECRET_JWT_SEED, { expiresIn: "2h" }, (error, token) => {
            if (error) {
                reject({
                    message: "Error generating JWT" /* ApiErrorMessages.tokenNotGenerated */,
                    logs: error,
                });
            }
            resolve({ jwt: token });
        });
    });
};
exports.GenerateJWT = GenerateJWT;
const ValidateJsonWebToken = (token) => {
    const payload = (jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT_SEED));
    return {
        uid: payload.uid,
        username: payload.username,
    };
};
exports.ValidateJsonWebToken = ValidateJsonWebToken;
//# sourceMappingURL=jwt.js.map