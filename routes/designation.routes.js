const express = require('express');
const router = express.Router();
const designationController = require('../controllers/designation.controller');

// Get all designations
router.get('/', designationController.getAllDesignations);

// Get a single designation by ID
router.get('/:id', designationController.getDesignationById);

// Create a new designation
router.post('/', designationController.createDesignation);

// Update a designation by ID
router.put('/:id', designationController.updateDesignation);

// Delete a designation by ID
router.delete('/:id', designationController.deleteDesignation);

module.exports = router;
