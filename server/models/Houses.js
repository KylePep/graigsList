import mongoose from "mongoose";
const Schema = mongoose.Schema

export const HousesSchema = new Schema(
  {
    name: { type: String, minlength: 5, maxlength: 100, required: true },
    price: { type: Number, max: 10000000, required: true },
    bedrooms: { type: Number, max: 100000 },
    bathrooms: { type: Number, max: 100000 },
    creatorId: { type: Schema.Types.ObjectId, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
