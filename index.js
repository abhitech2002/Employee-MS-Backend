const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const OragRoutes = require('./routes/organization.routes')
const EmployeeRoute = require("./routes/employee.routes")
const DepartmentRoute = require("./routes/department.routes")
const DesignationRoute = require("./routes/designation.routes")
const ExportFileRoutes = require('./routes/ExportFile.routes');
const cors = require('cors')

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())


const MONGODB_URI = process.env.MONGODB_URI
mongoose
    .connect(MONGODB_URI)
    .then( () => {
        console.log("MongoDB connected")
    })
    .catch((error) => console.log(error))


app.use('/api/organization/register', OragRoutes)
app.use('/api/employee/register', EmployeeRoute)
app.use('/api/department/register', DepartmentRoute)
app.use('/api/designation/register', DesignationRoute)
app.use('/api/export', ExportFileRoutes);

const PORT = process.env.PORT || 3000

app.listen(PORT, (req, res) => {
    console.log(`Server Started on server ${PORT}....`)
})