// Facade Pattern

import {
  MongoAdapter,
  PostgresAdapter,
  RedisAdapter,
  AuraAdapter,
} from "@/database/clients/index";

const AdapterFacade = (connectionString: string) => {
  if (connectionString.startsWith("postgres")) {
    return new PostgresAdapter(connectionString);
  } else if (connectionString.startsWith("mongodb")) {
    return new MongoAdapter(connectionString);
  } else if (connectionString.startsWith("redis")) {
    return new RedisAdapter(connectionString);
  } else if (
    connectionString.startsWith("neo4j") ||
    connectionString.startsWith("bolt")
  ) {
    return new AuraAdapter(connectionString);
  } else {
    throw new Error("Unsupported database");
  }
};

export default AdapterFacade;
