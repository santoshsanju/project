const exp=require("express")
const app=exp()
const path=require("path")
const env=require("dotenv").config()
const port=process.env.PORT
const userapp=require("./APIS/userapi")
const dataapp=require("./APIS/dataapi")
const cartapp=require("./APIS/cartapi")
app.use("/user",userapp)
app.use("/add",dataapp)
app.use("/cart",cartapp)

app.use(exp.static(path.join(__dirname,'./dist/app')))

const dbConnectionUrl=process.env.DATABASE_URL
const mongoose=require("mongoose")
mongoose.connect(dbConnectionUrl)
.then(()=>{console.log("Database is connected")})
.catch((err)=>{console.log("err in connetion",err)})

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'./dist/app/index.html'))
})

app.listen(port,()=>{
  console.log(`Server is lisetining on ${port}...`)
})