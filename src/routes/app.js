import express from "express"

const app = express () 

app.get("/",(req,res)=>{
    res.send ("hello world")
})

app.get("/about",(req,res)=>{
    res.send("About")
})

export {app}