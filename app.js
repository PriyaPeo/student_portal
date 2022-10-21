const express = require('express');
const jsonwebtoken=require('jsonwebtoken');
// const sessions = require('express-session');
var cors = require('cors');
const user=require('./Models/users');
const department=require('./Models/departments');

const dbconnection = require('./utils/dbconnection');
dbconnection();

const app = express();
const PORT = 4000;
// parsing the incoming data
app.use(express.json());
app.use(cors())

app.post('/register', async (req,res)=>{

const newUser = await user.create({
    phonenumber: req.body.phone,
    password: req.body.password
})

const token=jsonwebtoken.sign({
    phonenumber:newUser.phonenumber,
    active_status:newUser.active_status
},"signintoken")

res.status(201).json(token)

})


app.post('/login', async (req,res)=>{
    console.log(req.body);
    const newUser = await user.findOne({
        phonenumber: req.body.phone
    })
    console.log(newUser)
    if(newUser && newUser.password==req.body.password){
        const token=jsonwebtoken.sign({
            phonenumber:newUser.phonenumber,
            active_status:newUser.active_status
        },"signintoken")
        // console.log(token)
        res.status(201).json(token)
    }
    else res.status(401).json({messge:'Unauthorized User'})
    })

app.get('/home', async (req,res)=>{

    const result= await user.find();
    
    res.status(201).json(result)
    
    })

app.post('/info', async (req,res)=>{
    console.log(req.body)
    const token=jsonwebtoken.decode(req.body.token)
    const newUser = await user.findOne({
        phonenumber:token.phonenumber
    })
    console.log(token)
    if(newUser){
        await user.findOneAndUpdate({
            phonenumber:token.phonenumber
        },{fullname:req.body.fullname,department:req.body.department,sscpoint:req.body.sscpoint,hscpoint:req.body.hscpoint,active_status:true})
        const new_token=jsonwebtoken.sign({
            phonenumber:newUser.phonenumber,
            active_status:true
        },"signintoken")
        res.status(201).json(new_token)
    }
    else res.status(401).json({messge:"User Not Registerd"})
})

app.post('/getinfo',async(req,res)=>{
    const token=jsonwebtoken.decode(req.body.token)

    const user_info=await user.find({
        phonenumber:token.phonenumber
    })
    res.status(200).json(user_info)
})

app.post('/checkinfo',async(req,res)=>{
    const checkinfo=await user.find({
        phonenumber:req.body.phonenumber
    })
    
    res.status(200).json(checkinfo)
    console.log(req.body)
})

app.post('/NewlyadmitInfo',async(req,res)=>{
    const NewlyadmitInfo=await user.find({
        phonenumber:req.body.phonenumber
    });
    const department=await department.find({
        phonenumber:req.body.phonenumber
    })
    
})

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));