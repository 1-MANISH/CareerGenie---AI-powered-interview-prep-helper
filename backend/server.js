
import dotenv from 'dotenv';
import app from './src/app.js';
import connectToDatabase from './src/config/database.js';


// Load environment variables from .env file
dotenv.config()

// env variables
const PORT = process.env.PORT || 3001



connectToDatabase()


// health check route
app.get('/server/health',(req,res)=>{
        res.status(200).json(({
                success:true,
                message:"Server is healthy"
        }))
})

app.listen(PORT,()=>{
        console.log(`Server is running http://localhost:${PORT}`)
})
