import { Schema, model } from "mongoose";
import { Hike } from "../models/hike";

const HikeSchema = new Schema<Hike>(
  {
    title: { type: String, required: true },
    when: String,
    imgSrc: String,
    imgAlt: String,
    href: String,
    difficulty: String,
    distance: String,
    elevation: String
  },
  { collection: "hikes" }
);

const HikeModel = model<Hike>("Hike", HikeSchema);

// GET all
function index(): Promise<Hike[]> {
  return HikeModel.find().exec();
}

// GET one
function get(id: string): Promise<Hike | null> {
  return HikeModel.findById(id).exec();
}

// POST create
function create(json: Hike): Promise<Hike> {
  const hike = new HikeModel(json);
  return hike.save();
}

// PUT update
function update(id: string, json: Hike): Promise<Hike> {
  return HikeModel.findByIdAndUpdate(id, json, { new: true }).then(updated => {
    if (!updated) throw `${id} not updated`;
    return updated;
  });
}

// DELETE remove
function remove(id: string): Promise<void> {
  return HikeModel.findByIdAndDelete(id).then(deleted => {
    if (!deleted) throw `${id} not deleted`;
  });
}

export default { index, get, create, update, remove };