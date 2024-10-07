const db = require("../config/db");
const bcrypt = require('bcrypt')
// Get all managers
const getManagers = async (req, res) => {
    try {
        const data = await db.query('SELECT id, username, email, password FROM users WHERE role = "manager"');
        if (!data.length) {
            return res.status(404).send({
                success: false,
                message: 'No managers found',
            });
        }
        res.status(200).send({
            success: true,
            message: 'All managers retrieved successfully',
            data: data[0],
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in retrieving managers',
            error: error.message || error,
        });
    }
};




// Create a new manager
const createManager = async (req, res) => {
    try {
        const { username, password, email } = req.body; 
        if (!username || !password || !email) {
            return res.status(400).send({
                success: false,
                message: 'Provide all fields',
            });
        }


        const data = await db.query('INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, "manager")', [username, password, email]);
        res.status(201).send({
            success: true,
            message: 'Manager created successfully',
            data: { id: data[0].insertId, username, email },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in creating manager',
            error: error.message || error,
        });
    }
};


// Get manager by ID
const getManagerById = async (req, res) => {
    try {
        const managerId = req.params.id;
        const data = await db.query('SELECT id, username, email, password FROM users WHERE id = ? AND role = "manager"', [managerId]);
        if (!data.length) {
            return res.status(404).send({
                success: false,
                message: 'No manager found',
            });
        }
        res.status(200).send({
            success: true,
            message: 'Manager retrieved successfully',
            data: data[0][0],
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in retrieving manager by id',
            error: error.message || error,
        });
    }
};

// Update manager
const updateManager = async (req, res) => {
    try {
        const managerId = req.params.id;
        const { username, email, password } = req.body;

        const data = await db.query('UPDATE users SET username = ?, email=?, password=? WHERE id = ? AND role = "manager"', [username, email, password, managerId]);
        if (data.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: 'No manager found to update',
            });
        }

        res.status(200).send({
            success: true,
            message: 'Manager updated successfully',
            data: { id: managerId, username, email, password },

        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in updating manager',
            error: error.message || error,
        });
    }
};

// Delete manager
const deleteManager = async (req, res) => {
    try {
        const managerId = req.params.id;
        const data = await db.query('DELETE FROM users WHERE id = ? AND role = "manager"', [managerId]);
        if (data.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: 'No manager found to delete',
            });
        }

        res.status(200).send({
            success: true,
            message: 'Manager deleted successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in deleting manager',
            error: error.message || error,
        });
    }
};

// Get users managed by a specific manager
const getManagedUsers = async (req, res) => {
    try {
        const managerId = req.params.managerId;
        const data = await db.query('SELECT u.id, u.username FROM users u JOIN manager_user_relationship mur ON u.id = mur.user_id WHERE mur.manager_id = ?', [managerId]);
        if (!data.length) {
            return res.status(404).send({
                success: false,
                message: 'No users found for this manager',
            });
        }
        res.status(200).send({
            success: true,
            message: 'Managed users retrieved successfully',
            data: data[0],
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in retrieving managed users',
            error: error.message || error,
        });
    }
};

module.exports = { getManagers, createManager, getManagerById, updateManager, deleteManager, getManagedUsers };
