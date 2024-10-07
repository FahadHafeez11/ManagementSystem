const express = require('express');
const { getManagers, createManager, getManagerById, updateManager, deleteManager, getManagedUsers } = require('../controllers/managersController');

const router = express.Router();

// Get all managers
router.get('/get', getManagers);

// Create a new manager
router.post('/post', createManager);

// Get manager by ID
router.get('/get/:id', getManagerById);

// Update manager
router.put('/update/:id', updateManager);

// Delete manager
router.delete('/delete/:id', deleteManager);

// Get users managed by a specific manager
router.get('/managed-users/:managerId', getManagedUsers);

module.exports = router;
