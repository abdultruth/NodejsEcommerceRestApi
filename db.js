
const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

const mongoDB = 'mongodb://localhost:27017/truthdb';

 mongoose.connect(mongoDB);
const db = mongoose.connection;


main().catch(error => console.log(error));

async function main() {
    await mongoose.connect(mongoDB);
}