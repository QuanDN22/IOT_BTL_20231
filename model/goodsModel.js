import mongoose from "mongoose";
import { Card } from "./cardInfo.js";

const goodsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        purpose: {
            type: String,
            required: true
        },
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: Card }],
        date_in: {
            type: Date,
            default: Date.now,
        },
        date_out: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
)

export const Goods = mongoose.model('Goods_Inventory', goodsSchema);