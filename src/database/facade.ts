class Adapter {
  connectionString: string;

  constructor(connectionString: string) {
    this.connectionString = connectionString;
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
