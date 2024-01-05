import mongoose from "mongoose";
import { Card } from "./model/cardInfo.js";

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
        products: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
        begin: {
            type: Date,
            default: Date.now,
        },
        end: {
            type: Date,
        }
    },
    {
        timestamps: true
    }
)

export const goods = mongoose.model('Goods_Inventory', goodsSchema);