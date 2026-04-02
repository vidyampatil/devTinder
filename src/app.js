const express = require('express');

const app = express();

app.use((req,res)=>{
    res.send("hello from server")
})

app.use("/hello",(req,res)=>{
    res.send("hello from server2");
})

app.listen(3000,()=>{
    console.log('Server is successfully listining on port 3000')
});