require('dotenv').config()
const app = require('./app');
const { errorHandler } = require('./middleware/error');
const checkAuthentication = require('./middleware/authChecker');
const cors = require('cors');
const PORT = process.env.PORT || 8000;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const deleteUsersRouter = require('./routes/userDelete');

app.use(cors(corsOptions))
app.use('/api/auth', authRouter);
app.use('/api/users', checkAuthentication, userRouter);
app.use('/api/users', checkAuthentication, deleteUsersRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log("The app is running...")
})
