"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInValidators = exports.signupValidators = void 0;
const express_validator_1 = require("express-validator");
const check_errors_1 = require("./check-errors");
exports.signupValidators = [
    (0, express_validator_1.check)("username", "Username is required").not().isEmpty(),
    (0, express_validator_1.check)("username", "Invalid username's length.\nMin: 2 - Max: 20.").isLength({
        min: 2,
        max: 20,
    }),
    (0, express_validator_1.check)("email", "Email is required").not().isEmpty(),
    (0, express_validator_1.check)("email", "Email must be valid").isEmail(),
    (0, express_validator_1.check)("password", "Password is required").not().isEmpty(),
    check_errors_1.checkErrors,
];
exports.signInValidators = [
    (0, express_validator_1.check)("email", "Email is required").not().isEmpty(),
    (0, express_validator_1.check)("email", "Email must be valid").isEmail(),
    (0, express_validator_1.check)("password", "Password is required").not().isEmpty(),
    check_errors_1.checkErrors,
];
//# sourceMappingURL=auth.js.map