import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";

// Utility function to check if email is from the college domain
const isCollegeEmail = (email) => {
  return email.endsWith("@mhssce.ac.in");
};

// Register Admin (Exam Cell Staff)
export const registerAdmin = async (req, res) => {
  const { username, email, phone, password, confirmPassword } = req.body;

  // Validate required fields
  if (!username || !email || !phone || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate college email
  if (!isCollegeEmail(email)) {
    return res.status(400).json({ message: "Kindly use your college domain ID" });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ $or: [{ email }, { phone }] });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({ username, email, phone, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error in Register Admin:", error);
    res.status(500).json({ message: "Server error while creating admin", error: error.message });
  }
};

// Admin Login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Validate college email
  if (!isCollegeEmail(email)) {
    return res.status(400).json({ message: "Kindly use your college domain ID" });
  }

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error during login" });
  }
};
