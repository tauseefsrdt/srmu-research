const { app, connectDatabase } = require('../backend');

module.exports = async (req, res) => {
  try {
    await connectDatabase();
    return app(req, res);
  } catch (error) {
    console.error('Database connection error:', error.message);
    res.statusCode = 500;
    res.json({ error: 'Database connection failed' });
  }
};
