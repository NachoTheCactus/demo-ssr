const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config()

const app = express();

app.get("/", (req:any, res:any) => res.send("Express on Vercel"));

app.use(function(req:any, res:any, next:any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/data1', (req:any, res:any) => {
  const data = fs.readFileSync(path.join(__dirname, 'data', 'data1.json'));
  res.json(JSON.parse(data));
});

app.get('/api/data2', (req:any, res:any) => {
  const data = fs.readFileSync(path.join(__dirname, 'data', 'data2.json'));
  res.json(JSON.parse(data));
});

app.get('/api/companies', (req:any, res:any) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;

  try {
    const rawData = fs.readFileSync(path.join(__dirname, 'data', 'companies.json'));
    const data = JSON.parse(rawData);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedData = data.slice(startIndex, endIndex);

    res.status(200).json(paginatedData);
  } catch (err) {
    console.error('Error reading file:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/companiesl', (req:any, res:any) => {
  const data = fs.readFileSync(path.join(__dirname, 'data', 'companies.json'));
  const parsedData = JSON.parse(data);
  const length = parsedData.length;
  res.json(length);
});

app.get('/api/nearby-companies', (req:any, res:any) => {
  const data = fs.readFileSync(path.join(__dirname, 'data', 'companies.json'));
  res.json(JSON.parse(data));
});

app.get('/api/company/:numberId', (req:any, res:any) => {
  const data = fs.readFileSync(path.join(__dirname, 'data', 'companies.json'));
  const jsonData = JSON.parse(data);

  const companyId = parseInt(req.params.numberId);

  if (jsonData[companyId]) {
      res.json(jsonData[companyId]);
  } else {
      res.status(404).json({ error: 'Company not found' });
  }
});

const fetchRandomImage = async (nr:any) => {
  try {
    const response = await axios.get(`https://picsum.photos/id/${nr}/200`, { responseType: 'arraybuffer' });
    return `data:image/jpeg;base64,${Buffer.from(response.data, 'binary').toString('base64')}`;
  } catch (error) {
    return '/img/company-default.webp'
  }
};

app.get('/api/random-image/:numberId', async (req:any, res:any) => {
  try {
    const companyId = parseInt(req.params.numberId);
    const dataURI = await fetchRandomImage(companyId);
    res.json({ dataURI });
  } catch (error) {
    res.json({dataURI: "/img/company-default.webp"})
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));