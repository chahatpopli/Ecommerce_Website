import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

//Importing Middleware
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"

//Importing Routes
import authRoute from "./routes/auth.js"
import userRoute from "./routes/user.js"
import categoryRoute from "./routes/category.js"
import productRoute from "./routes/product.js"
import paymentBRoute from "./routes/paymentBRoutes.js"
import orderRoute from "./routes/order.js"


const app = express();

// DB Connections
const URL = "mongodb://user:chahat2001@tshirt-shard-00-00.4o5m9.mongodb.net:27017,tshirt-shard-00-01.4o5m9.mongodb.net:27017,tshirt-shard-00-02.4o5m9.mongodb.net:27017/tshirt_store?ssl=true&replicaSet=atlas-i80ms9-shard-0&authSource=admin&retryWrites=true&w=majority"
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Database Connected Successfully")
})

//use the Middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

// My Routes
app.use("/api", authRoute)
app.use("/api", userRoute)
app.use("/api", categoryRoute)
app.use("/api", productRoute)
app.use("/api", paymentBRoute)
app.use("/api", orderRoute)



// Port running 
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})