
const mongoose = require("mongoose");
const dotenv = require('dotenv')


dotenv.config({path:'./config.env'});

mongoose.set('strictQuery', false);


const mongoDB = process.env.DATABASE_LOCAL;

console.log(mongoDB)


main().then(() => {
    console.log('Database connected at ', mongoDB)
}).catch(error => console.log(error));

async function main() {
    await mongoose.connect(mongoDB);
}