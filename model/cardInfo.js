import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
    {
        UID: {
            type: String,
            require: true
        },
        name: {
            type: String,
            require: true
        },
        datein: { 
            type: Date, 
            default: Date.now 
        },
        dateout: {
            type: Date
        },
        prize: {
            type: String
        },
        expiry: {
            type: Date, 
        },
        is_exported: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

export const Card = mongoose.model('Info_Card', cardSchema);