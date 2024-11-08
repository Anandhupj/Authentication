const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const jwt=require("jsonwebtoken");

const app=express();
const PORT=5000;
const SECRET_KEY="jwt_secret_key";

app.use(cors());
app.use(bodyParser.json());

const user={
    username:"anandhupj",
    password:"anandhu@0456",
};

app.post("/login",(req,res)=>{
    const {username,password}=req.body;
    if(username===user.username && password === user.password){
 //create JWT token
 const token=jwt.sign({username},SECRET_KEY)
 return res.status(200).json({message:"login succesful",token})
    }
});

app.get("/dashboard",(req,res)=>{
    const {username,password}=req.body;
    
    if(username===user.username && password=== user.password){
        //create jwt token 
        const token=jwt.sign({username},SECRET_KEY);
        return res.status(200).json({message:"Login successful",token});
    }else{
        return res.status(401).json({message:"Invalid credentials"});
    }
});

app.get("/dashboard",(req,res)=>{
    const token=req.headers["authorization"];
    if(!token)return res.status(300).json({message:"Token required"});
    jwt.verify(token,SECRET_KEY,(err,decoded)=>{
        if(err)return res.status(402).json({message:"Invalid token"});
        //proceed if token is valid
      res.status(203).json({message:`Welcome to the dashboard,${decoded.username}`});
    });
});

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT} `);
    
})
