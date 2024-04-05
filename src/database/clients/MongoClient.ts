import { MongoClient } from "mongodb";
import CREATE_COLLECTIONS_IF_NOT_EXIST from "../migrations/collection";

class MongoAdapter {
  client: MongoClient;

  constructor(connectionString: string) {
    this.client = new MongoClient(connectionString);
  }

  async connect() {
    try {
      await this.client.connect();
      await CREATE_COLLECTIONS_IF_NOT_EXIST(this.client);
    } catch (e) {
      console.error("Error connecting to MongoDB:", e);
      throw e;
    }
  }

  async disconnect() {
    try {
      await this.client.close();
    } catch (e) {
      console.error("Error disconnecting from MongoDB:", e);
      throw e;
    }
  }
}

export default MongoAdapter;
