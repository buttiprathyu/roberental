const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const robeImageSchema = new Schema({
  email: {
    type: String,
    required: true,
 
  },
  robeTitle: {
    type: String,
    required: true
  },
  robeImg: {
    unique: true,
    type: String,
    required: true
  },
  rentPrice: {
    type: Number,
    required: true
  },
  buyPrice: {
    type: Number,
    required: true
  },
  robeSize: {
    type: String,
    required: true
  },
  robeMaterialDesc: {
    type: String,
    required: true
  },
  robeMaterial: {
    type: String,
    required: true
  },
  robeCare: {
    type: String,
    required: true
  }
}, {
  collection: 'robe_image'
})



const robe_image = mongoose.model('Robe_image', robeImageSchema);

module.exports = robe_image;