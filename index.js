const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const stationsRoute = require('./routes/stations');
const checkInsRoute = require('./routes/checkin');
const port = process.env.PORT || 3001;

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.log(err)
  });


app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/stations', stationsRoute);
app.use('/api/checkins', checkInsRoute);

app.listen(port, () => {
	console.log('Server is running...')
})