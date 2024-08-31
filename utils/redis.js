import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.error('Redis Client Error', err));

    this.client.connect()
      .then(() => console.log('Redis client connected'))
      .catch((err) => console.error('Error connecting Redis client', err));
  }

  // Check if Redis is alive (connected)
  isAlive() {
    return this.client.isReady;
  }

  // Get the value of a key from Redis
  async get(key) {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (error) {
      console.error('Error getting data from Redis:', error);
      return null;
    }
  }

  // Set a value in Redis with an expiration time (in seconds)
  async set(key, value, duration) {
    try {
      const valueStr = value.toString();  // Ensure the value is a string
      await this.client.setEx(key, duration, valueStr);
    } catch (error) {
      console.error('Error setting data in Redis:', error);
    }
  }

  // Delete a key from Redis
  async del(key) {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error('Error deleting data from Redis:', error);
    }
  }
}

// Export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
