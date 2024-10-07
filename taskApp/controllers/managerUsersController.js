const db = require("../config/db")

const assignUserToManager = async (req, res) => {
    try {
        const { managerId, userId } = req.body;

        // Validate managerId and userId
        if (!managerId || !userId) {
            return res.status(400).send({
                success: false,
                message: 'ManagerId and userId are required',
            });
        }

        // Insert into manager_user_mapping table
        const data = await db.query(`INSERT INTO manager_user_mapping (managerId, userId) VALUES (?, ?)`, [managerId, userId]);

        res.status(200).send({
            success: true,
            message: 'User assigned to manager successfully',
            data: data[0]
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error assigning user to manager',
            error: error.message || error.sqlMessage || error
        });
    }
};

const getUsersByManager = async (req, res) => {
    try {
        const managerId = req.params.managerId;

        if (!managerId) {
            return res.status(400).send({
                success: false,
                message: 'ManagerId is required',
            });
        }

        const data = await db.query(`
            SELECT u.* FROM users u 
            JOIN manager_user_mapping mum ON u.id = mum.userId
            WHERE mum.managerId = ?`, [managerId]);

        res.status(200).send({
            success: true,
            message: 'Users managed by this manager',
            data: data[0]
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error fetching users managed by this manager',
            error: error.message || error.sqlMessage || error
        });
    }
};

module.exports = { assignUserToManager, getUsersByManager};
