const express = require('express');
const path = require('path');
const fs = require('fs');
const date = new Date();

const app = express();

const port = process.env.PORT || 3000;

app.use((req,res,next)=>{
    console.log(`Request date : ${date}`);
    // res.send('Sunny leone...')
    next()
})

app.use((req,res,next)=>{
    const filepath = path.join(__dirname,"static",req.url);
    fs.stat(filepath,(err,file_info)=>{
        if(err){
            next();
            return;
        }
        if(file_info.isFile()){
            console.log(`${file_info}`);
            res.sendFile(filepath);
        }else{
            next();
        }
    })
})

app.use((req,res)=>{
    res.status(404);
    res.sendFile('/home/roshan/Desktop/practice/dailyTuition/projects/middleware_app/Middleware_app/static/fog-error-page-990x619.jpg');
})

app.listen(port,()=>console.log('hey,the server has started'));
