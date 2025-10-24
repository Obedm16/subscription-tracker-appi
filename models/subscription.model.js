import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: {
      type: Number,
      required: [true, "Subscription Price is required"],
      min: [0, "Price must be a positive number"],
    },
    currency: {
      type: String,
      required: true,
      enum: ["USD", "EUR", "GBP", "KSH"],
      default: "KSH",
    },
    frequency: {
      type: String,
      required: true,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      required: true,
      enum: ["sport", "news", "entertainment", "education"],
    },
    paymentMethod: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive", "cancelled"],
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date cannot be in the future",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: (value) => value > new Date(),
        message: "Renewal date must be in the future",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }
  if (this.renewalDate < new Date()) {
    this.status = "inactive";
  }
  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
