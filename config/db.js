
const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

const mongoDB = process.env.DATABASE_LOCAL;

 mongoose.connect(mongoDB);
const db = mongoose.connection;


main().then(() => {
    console.log('Database connected at ', mongoDB)
}).catch(error => console.log(error));

async function main() {
    await mongoose.connect(mongoDB);
    
}