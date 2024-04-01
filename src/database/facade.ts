class Connection {
  connectionString: string;
  checkOut: boolean;
  status: string | undefined;

  constructor(connectionString: string) {
    this.connectionString = connectionString;
    this.checkOut = false;
    this.close();
  }

  close(): void {
    this.checkOut = false;
    this.status = "closed";
  }

  open(): void {
    this.checkOut = true;
    this.status = "open";
  }
}

class ConnectionPool {
  pool: Connection[];

  constructor(config: {
    connectionString: string | undefined;
    poolSize: number | undefined;
  }) {
    this.pool = [];
    for (let i = 0; i < (config.poolSize || 0); i++) {
      const conn = new Connection(config.connectionString || "");
      this.pool.push(conn);
    }
  }

  checkout(): Connection {
    const found = this.pool.find((c) => !c.checkOut);
    if (found) {
      found.open();
      return found;
    } else {
      throw new Error("No available connections");
    }
  }

  checkin(conn: Connection): void {
    conn.close();
  }

  drain(): void {
    for (const conn of this.pool) {
      conn.close();
    }
  }
}

class Adapter {
  connectionString: string;

  constructor(connectionString: string) {
    this.connectionString = connectionString;
  }

  createConnectionPool(poolSize: number): ConnectionPool {
    return new ConnectionPool({
      connectionString: this.connectionString,
      poolSize,
    });
  }
}

class PostgresAdapter extends Adapter {
  constructor(connectionString: string) {
    super(connectionString);
  }
}

class RedisAdapter extends Adapter {
  constructor(connectionString: string) {
    super(connectionString);
  }
}

class MongoAdapter extends Adapter {
  constructor(connectionString: string) {
    super(connectionString);
  }
}

const AdapterFacade = (connectionString: string) => {
  if (connectionString.includes("postgres")) {
    return new PostgresAdapter(connectionString);
  } else if (connectionString.includes("redis")) {
    return new RedisAdapter(connectionString);
  } else if (connectionString.includes("mongo")) {
    return new MongoAdapter(connectionString);
  } else {
    throw new Error("Unknown adapter");
  }
};

export default AdapterFacade;
