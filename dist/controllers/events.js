"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeEvent = exports.updateEvent = exports.getEventById = exports.getEvents = exports.createEvent = void 0;
const Event_1 = __importDefault(require("../db/models/Event"));
const response_generation_1 = require("../utils/response-generation");
const createEvent = async (req, res) => {
    const id = req._id;
    const event = new Event_1.default({ ...req.body, user: id });
    try {
        const { _id, title } = await event.save();
        return res.json((0, response_generation_1.GenerateSuccessResponse)({
            _id,
            title,
        }));
    }
    catch (error) {
        return res
            .status(500)
            .json((0, response_generation_1.GenerateErrorResponse)("Internal server error" /* internalServerError */, error));
    }
};
exports.createEvent = createEvent;
const getEvents = async (req, res) => {
    try {
        const events = await Event_1.default.find().populate("user", "username");
        return res.json((0, response_generation_1.GenerateSuccessResponse)(events));
    }
    catch (error) {
        return res
            .status(500)
            .json((0, response_generation_1.GenerateErrorResponse)("Internal server error" /* internalServerError */, error));
    }
};
exports.getEvents = getEvents;
const getEventById = async (req, res) => {
    try {
        const result = await validateIfEventExistsAndUserPermissions(req.params.id, req._id);
        if (!result.ok) {
            return res
                .status(404)
                .json((0, response_generation_1.GenerateErrorResponse)(result.error?.message));
        }
        return res.json(result);
    }
    catch (error) {
        return res
            .status(500)
            .json((0, response_generation_1.GenerateErrorResponse)("Internal server error" /* internalServerError */, error));
    }
};
exports.getEventById = getEventById;
const updateEvent = async (req, res) => {
    try {
        const result = await validateIfEventExistsAndUserPermissions(req.params.id, req._id);
        if (!result.ok) {
            return res
                .status(404)
                .json((0, response_generation_1.GenerateErrorResponse)(result.error?.message));
        }
        const updatedEvent = await Event_1.default.findByIdAndUpdate(req.params.id, { ...req.body, user: req._id }, { new: true });
        return res.json((0, response_generation_1.GenerateSuccessResponse)({
            _id: req._id,
            title: updatedEvent?.title,
        }));
    }
    catch (error) {
        return res
            .status(500)
            .json((0, response_generation_1.GenerateErrorResponse)("Internal server error" /* internalServerError */, error));
    }
};
exports.updateEvent = updateEvent;
const removeEvent = async (req, res) => {
    try {
        const result = await validateIfEventExistsAndUserPermissions(req.params.id, req._id);
        if (!result.ok) {
            return res
                .status(404)
                .json((0, response_generation_1.GenerateErrorResponse)(result.error?.message));
        }
        await Event_1.default.findByIdAndDelete(req.params.id);
        return res.json((0, response_generation_1.GenerateSuccessResponse)({
            _id: req.params.id,
            title: result.data?.title,
        }));
    }
    catch (error) {
        return res
            .status(500)
            .json((0, response_generation_1.GenerateErrorResponse)("Internal server error" /* internalServerError */, error));
    }
};
exports.removeEvent = removeEvent;
const validateIfEventExistsAndUserPermissions = async (id, userId) => {
    const event = await Event_1.default.findById(id);
    if (!event)
        return (0, response_generation_1.GenerateErrorResponse)("Event not found" /* eventNotFound */);
    else if (event.user.toString() !== userId)
        return (0, response_generation_1.GenerateErrorResponse)("The user does not have sufficient permissions to perform this action" /* userUnauthorized */);
    return (0, response_generation_1.GenerateSuccessResponse)(event);
};
//# sourceMappingURL=events.js.map