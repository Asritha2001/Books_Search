// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

app.get('/api/books/search', async (req, res) => {
  try {
    const { q } = req.query;
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${q}&key=${GOOGLE_BOOKS_API_KEY}`
    );

    const books = response.data.items.map(item => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      description: item.volumeInfo.description,
      thumbnail: item.volumeInfo.imageLinks?.thumbnail
    }));

    res.json(books);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error fetching books' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});