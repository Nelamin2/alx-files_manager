import { createClient } from 'redis';

class RedisClient {
  constructor() {
    // Initialize the Redis client
    this.client = createClient();
    
    // Listen for errors
    this.client.on('error', (err) => {
      console.log('Redis client not connected to the server:', err.message);
    });

    // Connect to the Redis server
    this.client.connect().then(() => {
      console.log('Redis client connected to the server');
    }).catch((err) => {
      console.log('Error connecting Redis client:', err.message);
    });
  }

  // Check if Redis is alive by confirming the connection status
  isAlive() {
    return this.client.isOpen;
  }

  async get(key) {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (err) {
      console.log(`Failed to get ${key}: ${err.message}`);
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      await this.client.set(key, value, { EX: duration });
    } catch (err) {
      console.log(`Failed to set ${key}: ${err.message}`);
    }
  }

  async del(key) {
    try {
      await this.client.del(key);
    } catch (err) {
      console.log(`Failed to delete ${key}: ${err.message}`);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;

