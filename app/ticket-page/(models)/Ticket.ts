import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI as string);
mongoose.Promise = global.Promise;

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Hardware Problem",
        "Software Problem",
        "Network Problem",
        "Other",
      ],
      default: "Other",
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["started", "in-progress", "completed"],
      default: "started",
    },
    progress: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);
export default Ticket;
