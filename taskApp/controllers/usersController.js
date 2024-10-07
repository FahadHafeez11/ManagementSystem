const db = require("../config/db");

// Get all users
const getUsers = async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM users WHERE role="regular"');
        if (!data.length) {
            return res.status(404).send({
                success: false,
                message: 'No users found',
            });
        }
        res.status(200).send({
            success: true,
            message: 'All users retrieved successfully',
            data: data[0],
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in retrieving users',
            error: error.message || error,
        });
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        const { username, password, email, role } = req.body; 
        if (!username || !password || !role || !email) {
            return res.status(400).send({
                success: false,
                message: 'Provide all fields',
            });
        }

        const data = await db.query('INSERT INTO users (username, password,email, role) VALUES (?, ?, ?,?)', [username, password,email, role]);
        res.status(201).send({
            success: true,
            message: 'User created successfully',
            data: { id: data[0].insertId, username,password, email, role },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in creating user',
            error: error.message || error,
        });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = await db.query('SELECT id, username, role FROM users WHERE id = ?', [userId]);
        if (!data.length) {
            return res.status(404).send({
                success: false,
                message: 'No user found',
            });
        }
        res.status(200).send({
            success: true,
            message: 'User retrieved successfully',
            data: data[0][0],
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in retrieving user by id',
            error: error.message || error,
        });
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, email, password } = req.body;

        const data = await db.query('UPDATE users SET username = ?, email = ?, password=? WHERE id = ?', [username, email, password, userId]);
        if (data.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: 'No user found to update',
            });
        }

        res.status(200).send({
            success: true,
            message: 'User updated successfully',
            data: { id: userId, username, email, password },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in updating user',
            error: error.message || error,
        });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = await db.query('DELETE FROM users WHERE id = ?', [userId]);
        if (data.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: 'No user found to delete',
            });
        }

        res.status(200).send({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in deleting user',
            error: error.message || error,
        });
    }
};

// Assign a manager to a regular user
const assignManager = async (req, res) => {
    try {
        const { managerId, userId } = req.body;
        if (!managerId || !userId) {
            return res.status(400).send({
                success: false,
                message: 'Provide both managerId and userId',
            });
        }

        const data = await db.query('INSERT INTO manager_user_relationship (manager_id, user_id) VALUES (?, ?)', [managerId, userId]);
        res.status(201).send({
            success: true,
            message: 'Manager assigned successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in assigning manager',
            error: error.message || error,
        });
    }
};

module.exports = { getUsers, createUser, getUserById, updateUser, deleteUser, assignManager };
