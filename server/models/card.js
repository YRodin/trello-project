const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  name: String,
  description: String,
  label: String,  
  archived: Boolean,  
  list: { type: Schema.Types.ObjectId, ref: "list" },
  board: { type: Schema.Types.ObjectId, ref: "board" },
  comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
  activities: [{ type: Schema.Types.ObjectId, ref: "activity" }]
})

module.exports = mongoose.model("card", CardSchema);