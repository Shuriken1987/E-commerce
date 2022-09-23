const MONGO_PASS = process.env.MONGO_PASSWORD;
const MONGODB_URL = process.env.MONGO_URI;

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

module.exports = {
    MONGO_PASS: MONGO_PASS,
    MONGODB_URL: MONGODB_URL,
    mongooseOptions: mongooseOptions
};

