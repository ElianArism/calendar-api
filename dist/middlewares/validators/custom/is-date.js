"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDate = void 0;
const isDate = (value, { req, location, path }) => {
    if (!value.trim())
        return false;
    const timestamp = Date.parse(value);
    return !isNaN(timestamp);
};
exports.isDate = isDate;
//# sourceMappingURL=is-date.js.map