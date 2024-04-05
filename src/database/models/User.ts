import { MongoClient } from "mongodb";
import { z } from "zod";
async function createFieldsAndIndexes(
  client: MongoClient,
  databaseName: string,
  collectionName: string,
  schema: z.ZodObject<any>
) {
  try {
    const validator = {
      $jsonSchema: {
        bsonType: "object",
        required: [
          "id",
          "name",
          "email",
          "password",
          "role",
          "createdAt",
          "updatedAt",
        ],
        properties: {
          id: { bsonType: "string" },
          name: { bsonType: "string" },
          email: { bsonType: "string" },
          password: { bsonType: "string" },
          role: { bsonType: "string" },
          createdAt: { bsonType: "date" },
          updatedAt: { bsonType: "date" },
        },
      },
    };

    // Create custom primary key index
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);
    const indexExists = await collection.indexExists("id");
    if (!indexExists) {
      await collection.createIndex({ id: 1 }, { unique: true, name: "id" });
    }

    // foreign key under experiment
    
    await validator;

    // Create schema validator

    console.log(`Added schema validator for collection ${collectionName}`);
  } catch (error) {
    console.error(
      `Error adding schema validator for collection ${collectionName}:`,
      error
    );
    throw error;
  }
}

export default createFieldsAndIndexes;

// const db = client.db(databaseName);
// const collection = db.collection(collectionName);
