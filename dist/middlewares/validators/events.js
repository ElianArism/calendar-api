"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventvalidators = void 0;
const express_validator_1 = require("express-validator");
const check_errors_1 = require("./check-errors");
const is_date_1 = require("./custom/is-date");
exports.createEventvalidators = [
    (0, express_validator_1.check)("notes", "This field is required").not().isEmpty(),
    (0, express_validator_1.check)("title", "This field is required").not().isEmpty(),
    (0, express_validator_1.check)("start", "start date field is required").custom(is_date_1.isDate),
    (0, express_validator_1.check)("end", "end date field is required").custom(is_date_1.isDate),
    (0, express_validator_1.check)("user", "This field is required").not().isEmpty(),
    check_errors_1.checkErrors,
];
//# sourceMappingURL=events.js.map