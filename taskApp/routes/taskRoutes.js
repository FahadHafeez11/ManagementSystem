const express= require('express')
const { getTasks, createTask, getTaskById, updateTask, deleteTask, getManagerAssignedTasks, getTasksByuserId } = require('../controllers/tasksController')

const router = express.Router()

// Get all tasks
router.get('/get', getTasks)

// Create tasks
router.post('/post', createTask)

// Get task by id
router.get('/get/:id', getTaskById)

// Get task by userId
router.get('/getbyuserId/:id', getTasksByuserId)

// Update task
router.put('/update/:id', updateTask)

// Delete task
router.delete('/delete/:id', deleteTask)

// Get Tasks Assigned by Manager
router.get('/gettaskbymanager/:id', getManagerAssignedTasks);

module.exports=router