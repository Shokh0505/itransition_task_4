const app = require('./app');
const PORT = process.env.PORT || 3000;

const authRouter = require("./routes/auth");

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
    console.log("The app is running...")
})
