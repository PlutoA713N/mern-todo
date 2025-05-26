import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const uri = process.env.MONGO_URI;

if (!uri) {
    throw new Error('MONGO_URI not found');
}

export const connect = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB with Mongoose');
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const disconnect = async () => {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const pingDB = async () => {
    try {
        if (!mongoose.connection.db) {
            throw new Error("MongoDB connection not ready");
        }
        await mongoose.connection.db.command({ ping: 1 });
        console.log('Pinged MongoDB');
    } catch (e) {
        console.error(e);
        throw e;
    }
};
