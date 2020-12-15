const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./Employee')
const port = process.env.PORT || 5000 

app.use(bodyParser.json())
const Employee = mongoose.model("employee")

mongoUri = "mongodb+srv://olawale:Vdl2xT5vTXjOSdbJ@employeeapp.wxwnj.mongodb.net/EmployeeApp?retryWrites=true&w=majority"

mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false,
})
mongoose.connection.on('connected',()=>{
    console.log('database connected');
})
mongoose.connection.on('error',(err)=>{
    console.log('error',err);
})

app.get('/',(req,res)=>{
    Employee.find({})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        console.log(err)
    })
})

app.post('/send-data',(req,res)=>{
    const employee = new Employee({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        picture:req.body.picture,
        salary:req.body.salary,
        position:req.body.position
    })
    employee.save()
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        console.log(err)
    })
})

app.delete('/delete',(req,res)=>{
    Employee.findByIdAndRemove(req.body.id)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        console.log(err)
    })
})

app.put('/update',(req,res)=>{
    Employee.findByIdAndUpdate(req.body.id,{
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        picture:req.body.picture,
        salary:req.body.salary,
        position:req.body.position
    })
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        console.log(err)
    })
})

app.listen(port,()=>{
    console.log('server started');
})