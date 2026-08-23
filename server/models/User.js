import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  name: { type: String, default: 'Ramesh G.' },
  language: { type: String, default: 'Hindi' },
  occupation: { type: String, default: 'Salaried' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
