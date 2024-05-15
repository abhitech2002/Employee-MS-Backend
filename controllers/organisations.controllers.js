const Organization = require("../models/organisation.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config()

// Post
exports.createOrganization = async (req, res) => {
  try {
      const { name, email, phone, password } = req.body;
      
      // Check if the organization already exists
      let organisation = await Organisation.findOne({ email });
      if (organisation) {
          return res.status(400).json({ message: 'Organisation already exists' });
      }

      // Hash the password before saving the organisation
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new organization with the hashed password
      organisation = new Organisation({ name, email, phone, password: hashedPassword });
      await organisation.save();

      // Generate a JWT token
      const payload = {
          organisation: {
              id: organisation.id
          }
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ token, message:"Organization Registration Done Successfully..." });
  } catch (error) {
      res.status(400).json({ message: error.message });
      console.log("Organization Register Error:", error);
  }
};

// Get All
exports.getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get By ID
exports.getOrganizationById = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.json(organization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update
exports.updateOrganization = async (req, res) => {
  try {
    const organization = await Organization.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.json(organization);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete
exports.deleteOrganization = async (req, res) => {
  try {
    const organization = await Organization.findByIdAndDelete(req.params.id);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.json({ message: "Organization deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
