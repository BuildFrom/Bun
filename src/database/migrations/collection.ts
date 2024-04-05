import { MongoClient } from "mongodb";
import createFieldsAndIndexes from "../models/User";
import validate from "@/utils/validation-schema";
// id, name, email, password, role, createdAt, updatedAt
const dbName = "nextauth";
const collections = ["users", "products", "sessions", "carts"];

async function CREATE_COLLECTIONS_IF_NOT_EXIST(client: MongoClient) {
  try {
    const db = client.db(dbName);
    for (const collectionName of collections) {
      const collectionInfo = await db
        .listCollections({ name: collectionName })
        .toArray();
      if (collectionInfo.length === 0) {
        await db.createCollection(collectionName);
      }
    }

    await createFieldsAndIndexes(
      client,
      dbName,
      "users",
      validate.registerSchema
    );

    await list(client, dbName);
  } catch (error) {
    console.error("Error creating or checking collections:", error);
    throw error;
  }
}

async function list(client: MongoClient, databaseName: string) {
  try {
    const db = client.db(databaseName);
    const collections = await db.listCollections().toArray();
    console.log(`List of collections/tables from ${databaseName} database:`);
    collections.forEach((collection: any) =>
      console.log(` - ${collection.name}`)
    );
  } catch (e) {
    console.error(`Error listing collections in ${databaseName}:`, e);
    throw e;
  }
}

// ==============================
// Drop Database
// ==============================

async function dropDatabase(client: MongoClient, databaseName: string) {
  try {
    const db = client.db(databaseName);
    await db.dropDatabase();
    console.log(`Dropped database: ${databaseName}`);
  } catch (e) {
    console.error(`Error dropping database ${databaseName}:`, e);
    throw e;
  }
}

export default CREATE_COLLECTIONS_IF_NOT_EXIST;
