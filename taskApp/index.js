const express= require('express')
const mySqlPool = require('./config/db')
const cors = require('cors');
const app= express()
app.use(cors());
app.use(express.json());

app.use('/api/v1/tasks', require("./routes/taskRoutes"))
app.use('/api/v1/users', require("./routes/userRoutes"));
app.use('/api/v1/managers', require("./routes/managerRoutes"));
app.use('/api/v1/managerAssignUsers', require("./routes/managerUsersRoutes"));


app.get('/', (req, res)=>{
    res.send("Hello sql hello server")
})

mySqlPool.query('SELECT 1').then(()=>{

    console.log("Mysql db connected")

    app.listen(8080, ()=>{
        console.log('server is running')
    })


}).catch(()=>{
    console.log('error')

})