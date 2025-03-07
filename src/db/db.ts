import mongoose from "mongoose"

const connectToDB = async (): Promise<void>=> {
    try{
        const connection =await mongoose.connect(process.env.MONGODB_URI as string)
        console.log(`MongoDb connected, ${connection.connection.host} `)
    } catch(err) {
        console.log(err); 
        process.exit(1)
    }
}

export default connectToDB