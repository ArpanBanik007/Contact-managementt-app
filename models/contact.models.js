import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"]
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email address"
      ]
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [
        /^[0-9]{10}$/,
        "Phone number must be exactly 10 digits"
      ]
    },

    message: {
      type: String,
      trim: true,
      maxlength: [500, "Message cannot exceed 500 characters"]
    }
  },
  {
    timestamps: true
  }
);

contactSchema.index({ email: 1 });

export default mongoose.model("Contact", contactSchema);
