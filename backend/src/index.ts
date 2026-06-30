import express from "express"
import cors from "cors"
import { authrouter } from "./routes/auth.js"
import { mainrouter } from "./routes/feed.js"
const app=express()

app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000"
}))

app.use("/api",authrouter)
app.use("/api/main",mainrouter)
app.listen(5000)