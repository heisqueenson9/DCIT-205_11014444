const express = require('express')
const mongoose=require('mongoose')
const app = express()




app.get('/',(req,res) => {
    res.send("Hello NODE API")
})
app.listen(3000,()=>{
    console.log('Node API app is running on port 30000')
})
mongoose.connect()
    console.log('connected to mongoDB')
}). catch((error) => {
    console.log(error)
})