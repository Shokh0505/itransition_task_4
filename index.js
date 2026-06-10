require('dotenv').config()
const app = require('./app');
const { errorHandler } = require('./middleware/error');
const PORT = process.env.PORT || 3000;

const authRouter = require("./routes/auth");

app.use('/api/auth', authRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log("The app is running...")
})
