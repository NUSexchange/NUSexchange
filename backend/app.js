const express = require('express');
const cors = require('cors');
const path = require("path");


const app = express();
const port = (process.env.PORT || 5000);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

const getResults = require('./routes/results/getResults');
const getPdf = require('./routes/pdf/getPdf');
const getNlp = require('./routes/nlp/getNlp');

app.use('/getresults', getResults);
app.use('/getpdf', getPdf);
app.use('/getnlp', getNlp);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});