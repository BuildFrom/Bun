class Connection {
  connectionString: string;
  checkOut: boolean;
  status: string | undefined;
  conn: boolean | undefined;

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

  constructor(connectionString: string, poolSize: number = 10) {
    this.pool = [];
    for (let i = 0; i < poolSize; i++) {
      const conn = new Connection(connectionString);
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

function init(
  adapter: { pool: ConnectionPool; connectionString: string },
  poolSize: number
): void {
  adapter.pool = new ConnectionPool(adapter.connectionString, poolSize);
}

export default init;