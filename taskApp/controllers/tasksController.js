const db = require("../config/db")

// Get all tasks
const getTasks = async (req, res) => {
    try {
        const data = await db.query('SELECT * from tasks')
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'No record',
            })
        }
        res.status(200).send({
            success: true,
            message: 'All tasks',
            data: data[0]
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in get all tasks',
            error
        })
    }
}

// Create tasks
const createTask = async (req, res) => {
    try {
        const { title, description, due_date, status, userId } = req.body;
        if (!title || !description || !due_date || !status) {
            return res.status(500).send({
                success: false,
                message: 'Provide all fields',
            })
        }

        const data = await db.query(`INSERT INTO tasks (title, description, due_date, status, userId) VALUES(?,?,?,?,?)`, [title, description, due_date, status, userId])
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'Error in query',
            })
        }
        res.status(200).send({
            success: true,
            message: 'Created successfully',
            data: data[0]

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in creating tasks',
            error: error.message || error.sqlMessage || error
        })
    }

};

// Get task by id
const getTaskById = async (req, res) => {
    try {
        const taskId = req.params.id
        if (!taskId) {
            return res.status(404).send({
                success: false,
                message: 'Invalid taskId',
            })
        }
        const data = await db.query(`SELECT * FROM tasks WHERE id=?`, [taskId])
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'No task found',
            })
        }
        res.status(200).send({
            success: true,
            message: 'Get task successfully',
            data: data[0]

        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting tasks by id',
            error
        })
    }
}

// Get task with userId
const getTasksByuserId = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(404).send({
                success: false,
                message: 'Invalid userId',
            })
        }
        const data = await db.query(`SELECT * FROM tasks WHERE userId=?`, [userId])
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'No tasks found',
            })
        }
        res.status(200).send({
            success: true,
            message: 'Get tasks successfully',
            data: data[0]

        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting tasks by userId',
            error
        })
    }
}

// Update task
const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id
        if (!taskId) {
            return res.status(404).send({
                success: false,
                message: 'Invalid taskId',
            })
        }

        const { title, description, due_date, status } = req.body
        const data = await db.query(`UPDATE tasks SET title=?, description=?, due_date=?, status=? WHERE id=?`, [title, description, due_date, status, taskId])

        if (data.affectedRows === 0) { // Check if any row was updated
            return res.status(404).send({
                success: false,
                message: 'No task found to update',
            });
        }

        res.status(200).send({
            success: true,
            message: 'Update task successfully',
            data: data[0]

        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in updating task',
            error: error.message || error.sqlMessage || error
        })
    }
}

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id
        if (!taskId) {
            return res.status(404).send({
                success: false,
                message: 'Provide valid task id',
            });
        }
        const data = await db.query(`DELETE FROM tasks WHERE id=?`, [taskId])
        res.status(200).send({
            success: true,
            message: 'deleted task successfully',
            data: data[0]
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in deleting task',
            error
        })
    }
}

// Get all tasks for users assigned to a specific manager
const getManagerAssignedTasks = async (req, res) => {
    try {
        const managerId = req.user.id;  // Assuming you're using JWT to identify the logged-in manager

        // Fetch users assigned to this manager
        const [users] = await db.query('SELECT user_id FROM user_manager WHERE manager_id = ?', [managerId]);

        if (users.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No users assigned to this manager',
            });
        }

        // Extract all user_ids assigned to the manager
        const userIds = users.map(user => user.user_id);

        // Fetch all tasks for those users
        const [tasks] = await db.query('SELECT * FROM tasks WHERE user_id IN (?)', [userIds]);

        res.status(200).send({
            success: true,
            message: 'Tasks for users managed by this manager',
            data: tasks
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting tasks for manager',
            error: error.message || error.sqlMessage || error
        });
    }
};

module.exports = { getTasks, createTask, getTaskById, updateTask, deleteTask, getManagerAssignedTasks, getTasksByuserId }