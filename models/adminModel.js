import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@mhssce\.ac\.in$/, "Email must be a college email (@mhssce.ac.in)"],
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, "Phone number must be 10 digits"],
  },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
export default Admin;
