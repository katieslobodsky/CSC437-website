"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var hike_svc_exports = {};
__export(hike_svc_exports, {
  default: () => hike_svc_default
});
module.exports = __toCommonJS(hike_svc_exports);
var import_mongoose = require("mongoose");
const HikeSchema = new import_mongoose.Schema(
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
const HikeModel = (0, import_mongoose.model)("Hike", HikeSchema);
function index() {
  return HikeModel.find().exec();
}
function get(id) {
  return HikeModel.findById(id).exec();
}
function create(json) {
  const hike = new HikeModel(json);
  return hike.save();
}
function update(id, json) {
  return HikeModel.findByIdAndUpdate(id, json, { new: true }).then((updated) => {
    if (!updated) throw `${id} not updated`;
    return updated;
  });
}
function remove(id) {
  return HikeModel.findByIdAndDelete(id).then((deleted) => {
    if (!deleted) throw `${id} not deleted`;
  });
}
var hike_svc_default = { index, get, create, update, remove };
