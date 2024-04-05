// Double-Check and improve this file
// Personally, I have no experience with Neo4j,
// so I can't verify the code.

// Barely was able to run Neo4j Browser using cypher-shell only.

import { driver, Driver, Session } from "neo4j-driver";

class AuraAdapter {
  auraDriver: Driver;
  connectionString: string;

  constructor(connectionString: string) {
    this.connectionString = connectionString;
    this.auraDriver = driver(this.connectionString);
  }

  async connect(): Promise<Session> {
    const session = this.auraDriver.session();
    return session;
  }

  createConnectionPool(poolSize: number) {
    return {
      connectionString: this.connectionString,
      auraDriver: this.auraDriver,
      poolSize: poolSize,
    };
  }
}

export default AuraAdapter;
