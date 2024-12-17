// const mongoose = require('mongoose');

// const cabinSchema = new mongoose.Schema({
//   id: { type: Number, required: true },
//   name: { type: String, required: true },
//   maxCapacity: { type: Number, required: true },
//   regularPrice: { type: Number, required: true },
//   discount: { type: Number, required: true },
//   image: { type: String, required: true }
// });

// // module.exports = mongoose.model('cabins', cabinSchema);

// console.log(mongoose.models)


// const Cabins = mongoose.models.cabins || mongoose.model('cabins', cabinSchema)

// console.log(Cabins)

// export default Cabins;





// New


const mongoose = require('mongoose');

const cabinSchema = new mongoose.Schema({
  name: { type: String, required: true },
  maxCapacity: { type: Number, required: true },
  regularPrice: { type: Number, required: true },
  discount: { type: Number, required: true },
  image: { type: String, required: true }
});

// Remove the redundant `id` field as it's likely managed by MongoDB internally
// id: { type: Number, required: true },

const Cabins = mongoose.models.cabins || mongoose.model('cabins', cabinSchema);

module.exports = Cabins;