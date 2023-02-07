import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model("Team",mongoose.Schema(
    {
        manager:{
            type:Schema.Types.ObjectId,
            ref:"Manager",
            required:true,
        },
        members:[{
            type:Schema.Types.ObjectId,
            ref:"Member",
            required:true,
        }],
        teamName:{
            type:String,
            required:true,
        },
        view:{
            type:Boolean,
            default:true,
        }
    },
    modelOptions
));

