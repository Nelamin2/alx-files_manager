// controllers/AppController.js
const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

/**
 * Controller for handling status endpoint
 */
const getStatus = async (req, res) => {
  try {
    const redisAlive = redisClient.isAlive();
    const dbAlive = await dbClient.isAlive();
    
    res.status(200).json({
      redis: redisAlive,
      db: dbAlive
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Controller for handling stats endpoint
 */
const getStats = async (req, res) => {
  try {
    const usersCount = await dbClient.nbUsers();
    const filesCount = await dbClient.nbFiles();
    
    res.status(200).json({
      users: usersCount,
      files: filesCount
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getStatus,
  getStats
};
