import {connect, disconnect, pingDB} from "./config/mongoConnection";
import app from "./app";
import {config} from "dotenv";

config();

const PORT = process.env.PORT || 3000;


export const start = async () => {
    try {
        await connect()
        await pingDB()
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        await disconnect();
        console.log(e);
        process.exit(1);
    }
}

start()

