const mongoose = require('mongoose');

const app = require('./app')

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT)
    console.log(`Server running. Use our API on port ${PORT}`)
  })
  .then(() => console.log("Database connection successful"))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })


