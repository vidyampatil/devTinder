const express = require('express');

const app = express();

//This will only handle Get call to user
app.get("/user",(req,res)=>{
    res.send({firstName:'vidya',lastName:'Patil'});
})

app.post("/user",(req,res)=>{
    res.send("Data successfully save to database")
})

app.delete("/user",(req,res)=>{
    res.send("Data successfully deleted from database")
})

//This will match all the HTTP methods API calls to test
app.use("/test",(req,res)=>{
    res.send("hello from server2");
})

app.listen(3000,()=>{
    console.log('Server is successfully listining on port 3000')
});