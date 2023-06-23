import { Schema, model } from "mongoose";
import { IEvent } from "../../interfaces/event";

const EventSchema = new Schema<IEvent>({
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
    type: Schema.Types.ObjectId,
  },
});

EventSchema.method("toJSON", function () {
  const { __V, ...object } = this.toObject();
  return object;
});

const Event = model<IEvent>("Event", EventSchema);

export default Event;
