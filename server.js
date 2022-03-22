require('dotenv').config({ path: 'sample.env' });
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer({dest: "uploads/"})

//connecting to the server:
mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true });

// default connection:
const db = mongoose.connection;

// notification of connection error:
db.on("error", console.error.bind(console, "mongoBD connection error"));

// basic configuration:
const port = process.env.PORT || 3000;


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res, next) => {
  let file = req.file
  res.json({name: file.originalname, type: file.mimetype, size: file.size})
})

app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
