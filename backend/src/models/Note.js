import mongoose from "mongoose";

//1- create a schema
// 2- create model based off that schema

//SCHEMA
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  } //MongoDB gives you timestamps by default
);
//MODEL
const Note = mongoose.model("Note", noteSchema);

export default Note;
