"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./db/config"));
const router_1 = __importDefault(require("./routes/router"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
// CORS
exports.app.use((0, cors_1.default)());
// Body Requests Parser
exports.app.use(express_1.default.json());
// Routes
exports.app.use(router_1.default);
// Public dir
exports.app.use(express_1.default.static("public"));
// Database
(0, config_1.default)();
// Server
exports.app.listen(process.env.PORT, () => {
    console.log("Server running at port: ", process.env.PORT);
});
//# sourceMappingURL=index.js.map