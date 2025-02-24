// const gaurav=require('./second')
// console.log(gaurav)
// console.log("hii hello good monrning")
// console.log("im trying to explaning node.js")
// console.log("there are learning step by step")

// const fs=require('fs');
// const pk=fs.readFileSync('file1.txt','utf-8');
// console.log(pk)
// const pk1=fs.readFile('file2.txt','gaurab',(err,data)=>{
//     console.log('this is second pages11');
// });
// console.log(pk1);
// fs.readFile('file1.txt','utf-8',(err,data)=>{
// console.log(data) 
// })
// console.log("rest of the code")

// const fs=require("fs");
// const pk1=fs.writeFile("file1","gaurav",(err,data)=>{
//     console.log("this is my data");
// })
// console.log(pk1);
// console.log("rest of the code");



// const http = require('http')
// const fs = require('fs') 
// const path = require('path')
// function abc(req , res)
// {
    

// }
// const myserver = http.createServer((req, res)=>{
//     const log = ${new Date()}: ${req.url}:${req.method}:requested\n
//     fs.appendFile('log.txt',log,()=>{})
//     console.log('requested')
//     switch(req.url){
//         case '/':
//             if(req.method === 'GET')
//             {
//             fs.readFile(path.join(__dirname,'index.html'),(err,content)=>{
//                 res.end(content)
//             })
//         }
//         else if(req.method === 'POST')
//         {   
//             /DB query/
//             res.end("Posted")
//         }
//         break;
//         case '/about':
//             fs.readFile(path.join(__dirname,'about.html'),(err,content)=>{
//                 res.end(content)
//         })
//         break;
//         case '/services':
//             fs.readFile(path.join(__dirname,'service.html'),(err,content)=>{
//                 res.end(content)
//         })
//         break;
//         case '/contact':
//             fs.readFile(path.join(__dirname,'contact.html'),(err,content)=>{
//                 res.end(content)
//         })
        
//     }
// })
// myserver.listen(8000,()=>{
//     console.log("server created")
    
// })

const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(express.static('public'))

const user = require('./Schema')
const passport = require('passport')
const { Initiolizepassport } = require('./public/passportconfig')
mongoose.connect('mongodb://127.0.0.1:27017/6cse7')
.then(()=>console.log('Mongodb connected'))
.catch(err=>{console.log('Error connecting MongoDB',err)})

app.use(session({
    secret : 'your_secret_key',
    resave : false,
    saveUninitialized : false
}))

app.use(passport.initialize())
app.use(passport.session())
InitiolizePassport(passport)

app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
})
app.get('/home',(req,res)=>{
    res.send("Welcome to home page")
})
app.get('/about',(req,res)=>{
    res.send("Welcome to about page")
})
app.get('/service',(req,res)=>{
    res.send("Welcome to service page")
})
app.get('/contact',(req,res)=>{
    res.send("Welcome to contact")
})
app.get('/register',(req,res)=>{
    res.sendFile(__dirname + '/public/register.html')
})
app.get('/login',(req,res)=>{
    res.sendFile(__dirname + '/public/login.html')
})
app.post('/login',passport.authenticate('local',{failureRedirect:'/login'})=>{
    res.send('welcome ${req.user.UserName}')
})

app.post('/register',(req,res)=>{
    const NewUser = new user({
        FullName : req.body.FullName,
        Email : req.body.Email,
        Password : req.body.Password,
        ConfirmPassword : req.body.ConfirmPassword,
        Phonenumber : req.body.Phonenumber
    })
    NewUser.save()
    .then(()=>{res.send("User is Saved")})
    .catch(err=>res.status(500).send("Error in saving data"+err.message))
})
app.listen(8000,()=>{
    console.log('http://localhost:8000')
})
