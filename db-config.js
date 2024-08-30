const mongoose = require('mongoose')
require('dotenv').config();
const mongoUri = process.env.MONGO_URI;

const dbConnect = async () => {
    try {
        mongoose.connect(mongoUri).then(() => {
            console.log("DB Connected Successfully.")
        }).catch(() => {
            console.log("Db Not Connected.... !!!")
        })
    } catch (error) {
        console.error('Database connection failed :', error);
    }
}

module.exports = dbConnect;