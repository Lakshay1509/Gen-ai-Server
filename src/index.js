import dotenv from "dotenv"
import app from "./app.js"
import connect from "./db/index.js"

dotenv.config({
    path : './env'
})




connect()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running on port ${process.env.PORT || 8000}`)
    })
})