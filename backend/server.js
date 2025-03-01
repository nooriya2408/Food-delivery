import express from "express"
import cors from "cors"
import { connectDB} from './config/db.js'
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoutes.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

//app config
const app = express()
const port = process.env.PORT || 4000;
//middleware
app.use(express.json())
app.use(cors())
//db connection
connectDB()
// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('upload'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get('/',(req,res)=>{
res.send("Server is running.....")
})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})
//mongodb+srv://nooriya2408:nooriya2408@cluster0.dofhq.mongodb.net/Food-Delivery