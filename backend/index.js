require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { PatentModel } = require('./model/patentsModel');
const { ResearchsModel } = require('./model/researchsSchema');
const { BooksModel } = require('./model/booksModel');


const app = express();
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

app.get('/', (req, res) => {
  res.send('Hello World! my name is mohit');
});

app.get('/api/stats', async (req, res) => {
  try {
    const [totalIndexed, totalPapers, totalBooks, paperAuthors, patentInventors] = await Promise.all([
      ResearchsModel.countDocuments(),
      PatentModel.countDocuments(),
      BooksModel.countDocuments(),
      ResearchsModel.distinct('authorName'),
      PatentModel.distinct('patenterName'),
    ]);

    const researchers = new Set(
      [...paperAuthors, ...patentInventors]
        .filter(Boolean)
        .flatMap((names) => names.split(',').map((name) => name.trim()))
        .filter(Boolean),
    );

    res.json({
      totalIndexed,
      totalPapers,
      totalBooks,
      totalResearchers: researchers.size,
    });
  } catch (err) {
    console.error('Error fetching stats:', err.message);
    res.status(500).json({ error: 'Unable to load statistics' });
  }
});

app.get('/api/featured', async (req, res) => {
  try {
    const [papers, indexed, books] = await Promise.all([
      PatentModel.find().sort({ srNo: 1 }).limit(3).lean(),
      ResearchsModel.find().sort({ srNo: 1 }).limit(3).lean(),
      BooksModel.find().sort({ slNo: 1 }).limit(3).lean(),
    ]);

    res.json({ papers, indexed, books });
  } catch (err) {
    console.error('Error fetching featured content:', err.message);
    res.status(500).json({ error: 'Unable to load featured content' });
  }
});

app.get(['/patents', '/api/patents'], async (req, res) => {
  try {
    const patents = await PatentModel.find().sort({ srNo: 1 }).lean();
    res.json({ patents, count: patents.length });
  } catch (err) {
    console.error('Error fetching patents:', err.message);
    res.status(500).json({ error: 'Unable to load patents' });
  }
});


app.get(['/researchPapers', '/api/researchPapers'], async (req, res) => {
  try {
    const papers = await ResearchsModel.find().sort({ srNo: 1 }).lean();
    res.json({ papers, count: papers.length });
  } catch (err) {
    console.error('Error fetching research papers:', err.message);
    res.status(500).json({ error: 'Unable to load research papers' });
  }
});

app.get(['/books', '/api/books'], async (req, res) => {
  try {
    const books = await BooksModel.find().sort({ slNo: 1 }).lean();
    res.json({ books, count: books.length });
  } catch (err) {
    console.error('Error fetching books:', err.message);
    res.status(500).json({ error: 'Unable to load books' });
  }
});

async function start() {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`Backend server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}


start();