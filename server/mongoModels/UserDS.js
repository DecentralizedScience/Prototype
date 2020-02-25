const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserDSSchema = new mongoose.Schema({
  _id: String,
  username: String,
  name: String,
  surname: String,
  email: String,
  password: String,
  profilePicture: Buffer,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
});

module.exports = mongoose.model('UserDS', UserDSSchema);
