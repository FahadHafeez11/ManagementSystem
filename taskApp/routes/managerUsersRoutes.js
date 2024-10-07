const express = require('express');
const { assignUserToManager, getUsersByManager } = require('../controllers/managerUsersController');

const router = express.Router();

// Get all users assigned to manager
router.get('/get', getUsersByManager);

// Assign new users
router.post('/post', assignUserToManager);


module.exports = router;
