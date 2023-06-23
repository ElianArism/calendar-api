"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.DB_CONNECTION_STR || "");
    }
    catch (error) {
        console.log("Error trying to connect to DB");
        console.log("Logs: ", error);
    }
};
exports.default = connectDB;
//# sourceMappingURL=config.js.map