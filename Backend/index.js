const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
// const csv = require('fast-csv');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3050;

app.use(cors());
app.use(express.json());

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Store CSV data
let csvData = [];

app.get('/',(req,res) => {
    res.send('hello');
})

// Endpoint to handle CSV file upload
app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);
  const filePath = req.file.path;
  console.log(req.file);
  csvData = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      csvData.push(row);
    })
    .on('end', () => {
      fs.unlinkSync(filePath); // Remove the file after parsing
      console.log(csvData);
      res.json({ message: 'File uploaded and data parsed successfully', data: csvData });
    });
    console.log(csvData);
});

// Endpoint to get paginated data
app.get('/data', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const startIndex = (page - 1) * limit;
//   console.log(startIndex);
  const endIndex = page * limit;
//   console.log(endIndex);
  const paginatedData = csvData.slice(startIndex, endIndex);
  res.json({ data: paginatedData, total: csvData.length });
});

// Endpoint to calculate subscription pricing
app.post('/calculate', (req, res) => {
  const { BasePrice, PricePerCreditLine, PricePerCreditScorePoint } = req.body;
  const result = csvData.map(item => {
    const CreditScore = parseFloat(item.CreditScore);
    const CreditLines = parseFloat(item.CreditLines);
    const SubscriptionPrice = BasePrice + (PricePerCreditLine * CreditLines) + (PricePerCreditScorePoint * CreditScore);
    return { ...item, SubscriptionPrice };
  });
  res.json({ data: result, total: result.length });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
