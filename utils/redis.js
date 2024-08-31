import { createClient } from 'redis';

/**
 * Class for performing operations with Redis service
 */
class RedisClient {
  constructor() {
    this.client = createClient({
      url: 'redis://127.0.0.1:6379'
    });

    this.client.on('error', (error) => {
      console.error(`Redis client not connected to the server: ${error.message}`);
    });

    // Ensure the client connects before performing operations
    this.client.connect().catch(err => {
      console.error('Failed to connect to Redis server:', err.message);
    });
  }

  isAlive() {
    // Return true if the client is connected and open
    return this.client.isOpen;
  }

  async get(key) {
    if (this.isAlive()) {
      return await this.client.get(key);
    } else {
      console.error('Redis client is not connected.');
      return null;
    }
  }

  async set(key, value, duration) {
    if (this.isAlive()) {
      await this.client.setEx(key, duration, value);
    } else {
      console.error('Redis client is not connected.');
    }
  }

  async del(key) {
    if (this.isAlive()) {
      await this.client.del(key);
    } else {
      console.error('Redis client is not connected.');
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;

