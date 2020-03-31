import mongoose, { Schema } from 'mongoose';

const albumSchema: Schema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  genre: { type: String, required: true },
  releaseDate: { type: Date, default: Date.now },
  label: { type: String, required: true },
  catalogNumber: { type: Number, required:true }
});

export default mongoose.model('albums', albumSchema);