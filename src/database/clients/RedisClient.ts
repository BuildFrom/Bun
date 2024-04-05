// Must work in conjunction with PostgresAdapter and MongoAdapter

import redis from "redis";

class RedisAdapter {
  connectionString: string;
  client: any;

  constructor(connectionString: string) {
    this.connectionString = connectionString;
    this.client = null;
  }

  async connect(): Promise<any> {
    if (!this.client) {
      this.client = redis.createClient({ url: this.connectionString });
    }
    return this.client;
  }

  cache(key: string, ttl: number, slowFn: Function): Function {
    const rGet = async (key: string) => {
      return new Promise<string | null>((resolve, reject) => {
        this.client.get(key, (err: any, reply: string | null) => {
          if (err) reject(err);
          resolve(reply);
        });
      });
    };

    const rSet = async (key: string, ttl: number, value: string) => {
      return new Promise<void>((resolve, reject) => {
        this.client.setex(key, ttl, value, (err: any) => {
          if (err) reject(err);
          resolve();
        });
      });
    };

    return async (...props: any[]) => {
      const cachedResponse = await rGet(key);
      if (cachedResponse) {
        return JSON.parse(cachedResponse);
      }

      const result = await slowFn(...props);
      await rSet(key, ttl, JSON.stringify(result));
      return result;
    };
  }

  async close(): Promise<void> {
    if (this.client) {
      this.client.quit();
      this.client = null;
    }
  }

  createConnectionPool(poolSize: number) {
    return this.connect();
  }
}

export default RedisAdapter;
