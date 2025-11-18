import { Schema, model } from "mongoose";
import { Hike } from "../models/hike";

const HikeSchema = new Schema<Hike>(
  {
    title: String,
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

function index(): Promise<Hike[]> {
  return HikeModel.find();
}

function get(title: string): Promise<Hike | null> {
  return HikeModel.findOne({ title });
}

export default { index, get };