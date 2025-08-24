const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true, maxLength: 50 },
  amount: { type: Number, required: true, min: 0 },
  date: { type: Date, required: true },
  source: { type: String, required: true, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Income', IncomeSchema);