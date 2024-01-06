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
        begin: {
            type: Date,
            default: Date.now,
        },
        end: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
)

export const Goods = mongoose.model('Goods_Inventory', goodsSchema);