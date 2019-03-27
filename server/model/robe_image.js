const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const robeImageSchema = new Schema(
  {
    robeID : { type: Number, required: true, unique: true },
    robeTitle : { type: String, required: true },
    robeImg : { type: String, required: true },
    rentPrice : { type: Number, required: true},
    buyPrice : { type: Number, required: true}
  },{collection:'robe_image'}
)



const robe_image = mongoose.model('Robe_image', robeImageSchema);

module.exports = robe_image;