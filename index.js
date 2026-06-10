require('dotenv').config()
const app = require('./app');
const { errorHandler } = require('./middleware/error');
const checkAuthentication = require('./middleware/authChecker');
const PORT = process.env.PORT || 3000;

const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');

app.use('/api/auth', authRouter);
app.use('/api/users', checkAuthentication, userRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log("The app is running...")
})
