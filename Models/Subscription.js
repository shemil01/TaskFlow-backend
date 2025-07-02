const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  orgId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  stripeSubscriptionId: { type: String },
  plan: { type: String, enum: ['free', 'pro', 'enterprise'], default: 'free' },
  status: { type: String, enum: ['active', 'canceled', 'incomplete'], default: 'active' },
  currentPeriodEnd: Date,
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
