import 'dotenv/config';

export default Object.freeze({
    MONGO_URL: "mongodb+srv://naveen:naveen@cluster0.tflnq.mongodb.net/tracking?retryWrites=true&w=majority",
    ADMIN_JWT_SECRET: 'trackingbackend',
    FRONT_END_URL: 'https://localhost:3000'
});
