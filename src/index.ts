import * as dotenv from "dotenv"; 
import * as express from "express" ;
import connectToDB from "./db/db";
import * as cors from "cors";
import authRoutes from "./routes/auth";
import recipeRoutes from "./routes/recipes";

dotenv.config()

const app  = express()

connectToDB()
app.use(cors())
app.use(express.json()) 

app.use("/api/auth", authRoutes);
app.use("/api/recipe", recipeRoutes);

const PORT = process.env.PORT || 5000

 
app.listen(PORT, ()=> console.log(`Server is listening on ${PORT}`))
