import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  monthlySavings: { type: Number, required: true },
  tenureYears: { type: Number, required: true },
  expectedReturnRate: { type: Number, default: 12 },
  projectedMaturity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Goal', goalSchema);
