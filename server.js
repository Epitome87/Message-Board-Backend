const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDatabase = require('./config/database');
const userRouter = require('./routes/userRoutes');
const commentRouter = require('./routes/commentRoutes');
const postRouter = require('./routes/postRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const PORT = process.env.PORT || 5000;

// Connect to our MongoDB database
connectDatabase();

// Create an instance of our Express application
const app = express();

// Prevent "blocked by CORS policy" error when calling our API endpoints from frontend
app.use(cors());

// Required to parse the body of a request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use our routers
app.use('/api/users', userRouter);
app.use('/api/comments', commentRouter);
app.use('/api/posts', postRouter);

// Use a custom error handler middleware to replace Express' default
// It's important for this to come AFTER our routers!
app.use(errorHandler);

app.listen(5000, () => console.log(`Server started on port ${PORT}`));
