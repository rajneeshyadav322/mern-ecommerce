const express = require('express')
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const myAccountRoute = require('./routes/myAccount')
const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')
const categoryRoute = require('./routes/category')
const uploadRoute = require('./routes/upload')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const stripeRoute = require('./routes/stripe')


dotenv.config();

const corsOptions = {
    origin: "*",
    // credentials: true,
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
}))


app.use('/api/auth', authRoute);
app.use('/api/my', myAccountRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/order', orderRoute);
app.use('/api/category', categoryRoute);
app.use('/api/image', uploadRoute)
app.use('/api/checkout', stripeRoute)


mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true, 
})
.then(() => {
    console.log("Connected to mongodb successfully")
}).catch((err) => {
    console.log(err);
});


app.listen(process.env.PORT, ()=>{
    console.log("Backend Server is running")
})