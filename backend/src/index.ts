import express from "express"
import cors from "cors"
import { authrouter } from "./routes/auth.js"
const app=express()

app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000"
}))

app.use("/auth",authrouter)
app.listen(5000)