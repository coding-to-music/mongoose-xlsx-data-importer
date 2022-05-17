const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const streetSchema = new Schema({
  name: { type: String, required: true },
  from: { type: String },
  to: { type: String },
  width: { type: number },
  length: { type: number },
  date: { type: String },
  noncity: { type: String },
  unnacceptedlength: { type: String },
});

module.exports = mongoose.model("Street", streetSchema);

// id                String  @id @default(cuid())
// name              String?
// from              String?
// to                String?
// width             Int?
// length            Int?
// date              String?
// noncity           String?
// unnacceptedlength String?

// userSchema.plugin(uniqueValidator);
