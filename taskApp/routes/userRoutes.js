const express = require('express');
const { getUsers, createUser, getUserById, updateUser, deleteUser, assignManager } = require('../controllers/usersController');

const router = express.Router();

// Get all users
router.get('/get', getUsers);

// Create a new user
router.post('/post', createUser);

// Get user by ID
router.get('/get/:id', getUserById);

// Update user
router.put('/update/:id', updateUser);

// Delete user
router.delete('/delete/:id', deleteUser);

// Assign a manager to a regular user
router.post('/assign-manager', assignManager);

module.exports = router;
