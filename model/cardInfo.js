import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
    {
        UID: {
            type: String,
            require: true
        },
        category_name: {
            type: String,
            require: true
        },
        category_id: {
            type: String,
            require: true
        },
        date_in: { 
            type: Date, 
            default: Date.now 
        },
        date_out: {
            type: Date
        },
        is_exported: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true
    }
);

export const Card = mongoose.model('Info_Card', cardSchema);