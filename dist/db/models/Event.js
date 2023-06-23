"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EventSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        ref: "User",
        required: true,
        type: mongoose_1.Schema.Types.ObjectId,
    },
});
EventSchema.method("toJSON", function () {
    const { __V, ...object } = this.toObject();
    return object;
});
const Event = (0, mongoose_1.model)("Event", EventSchema);
exports.default = Event;
//# sourceMappingURL=Event.js.map