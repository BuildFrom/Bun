import { Pool } from "pg";

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

class PostgresAdapter {
  connectionString: string;
  newPool: Pool;
  newConnection: Connection[] = [];

  constructor(connectionString: string) {
    this.connectionString = connectionString;
    this.newPool = new Pool({
      connectionString,
    });
  }

  async checkout(): Promise<Connection> {
    await this.newPool.connect();
    const found = this.newConnection.find((c) => !c.checkOut);
    if (found) {
      found.open();
      return found;
    } else {
      throw new Error("No available connections");
    }
  }

  async checkin(conn: Connection): Promise<void> {
    conn.close();
  }

  async drain(): Promise<void> {
    await this.newPool.end();
    for (const conn of this.newConnection) {
      conn.close();
    }
  }

  async query(query: string): Promise<any> {
    const client = await this.checkout();
    try {
      return;
    } finally {
      this.checkin(client);
    }
  }

  async select(query: string): Promise<any> {
    const client = await this.checkout();
    try {
      return;
    } finally {
      this.checkin(client);
    }
  }

  async insert(query: string): Promise<any> {
    const client = await this.checkout();
    try {
      return;
    } finally {
      this.checkin(client);
    }
  }

  async update(query: string): Promise<any> {
    const client = await this.checkout();
    try {
      return;
    } finally {
      this.checkin(client);
    }
  }

  async delete(query: string): Promise<any> {
    const client = await this.checkout();
    try {
      return;
    } finally {
      this.checkin(client);
    }
  }
}

export default PostgresAdapter;

// async checkout(): Promise<Connection> {
//   await this.newPool.connect();
//   const found = this.newConnection.find((c) => !c.checkOut);
//   if (found) {
//     found.open();
//     return found;
//   } else {
//     throw new Error("No available connections");
//   }
// }

// async checkin(conn: Connection): Promise<void> {
//   conn.close();
// }

// async drain(): Promise<void> {
//   await this.newPool.end();
//   for (const conn of this.newConnection) {
//     conn.close();
//   }
// }
