import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
  "Task",
  mongoose.Schema(
    {
      manager: {
        type: Schema.Types.ObjectId,
        ref: "Manager",
        required: true,
      },
      team: {
        type: Schema.Types.ObjectId,
        ref: "Team",
        required: true,
      },
      taskName: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        default: "TO DO",
      },
      statusColor:{
        type:"String",
      },
      assignee: {
        type: Schema.Types.ObjectId,
        ref: "Member",
      },
      startDate: {
        type: Date,
      },
      dueDate: {
        type: Date,
      },
      description: {
        type: String,
      },
      priority: {
        type: String,
      },
      tags: [
        {
          type: String,
        },
      ],
    },
    modelOptions
  )
);
