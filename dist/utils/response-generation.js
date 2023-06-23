"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateSuccessResponse = exports.GenerateErrorResponse = void 0;
const GenerateErrorResponse = (message, logs) => {
    return {
        data: null,
        error: {
            message,
            logs,
        },
        ok: false,
    };
};
exports.GenerateErrorResponse = GenerateErrorResponse;
const GenerateSuccessResponse = (data) => {
    return {
        data,
        error: null,
        ok: true,
    };
};
exports.GenerateSuccessResponse = GenerateSuccessResponse;
//# sourceMappingURL=response-generation.js.map