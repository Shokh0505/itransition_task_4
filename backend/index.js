require('dotenv').config()
const app = require('./app');
const cookieParser = require('cookie-parser');
const { errorHandler } = require('./middleware/error');
const checkAuthentication = require('./middleware/authChecker');
const cors = require('cors');
const PORT = process.env.PORT || 8000;

const corsOptions = {
    origin: ['http://localhost:3000', 'https://itransitiontask4-production.up.railway.app'],
    credentials: true
}

const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const deleteUsersRouter = require('./routes/userDelete');

app.use(cors(corsOptions))
app.use('/api/auth', authRouter);

// Protected routes
app.use(cookieParser());
app.use(checkAuthentication)
app.use('/api', userRouter);
app.use('/api', deleteUsersRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log("The app is running...")
})
