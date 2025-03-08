import * as dotenv from "dotenv"; 
import * as express from "express" ;
import connectToDB from "./db/db";
import * as cors from "cors";
import authRoutes from "./routes/auth";

dotenv.config()

const app  = express()

connectToDB()
app.use(cors())
app.use(express.json()) 

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000

 
app.listen(PORT, ()=> console.log(`Server is listening on ${PORT}`))
