const mongoose = require("mongoose");
const db = 
"mongodb+srv://chandlerjuego101:LdjMdyRv9DqjUwjd@cpts322-libraryassistan.uo25qpa.mongodb.net/";

mongoose.set("strictQuery", true, "useNewUrlParser", true);

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log("MongoDB is connected...");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;