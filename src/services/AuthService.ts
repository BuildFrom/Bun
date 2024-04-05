import { db } from "@/database/index";

class AuthService {
  async getUserByUsername(username: any) {
    const client = await db();
    try {
      const result = await client.query(
        "SELECT * FROM Users WHERE username = $1",
        [username]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async checkExistingUser(userData: any) {
    const client = await db();
    try {
      const result = await client.query(
        "SELECT * FROM Users WHERE username = $1 OR email = $2",
        [userData.username, userData.email]
      );
      return result;
    } catch (error) {
      console.error("Error checking existing user:", error);
      throw error;
    } finally {
      client.release();
    }
  }

  async registerDefaultUser(userData: any) {
    const client = await db();
    try {
      const existingUser = await this.checkExistingUser(userData);
      if (existingUser.rows.length > 0) {
        return "Username or email already exists";
      }

      const hashedPassword = await Bun.password.hash(userData.password, {
        algorithm: "bcrypt",
      });

      await client.query(
        "INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4)",
        [userData.name, userData.username, userData.email, hashedPassword]
      );
      return "User registered successfully";
    } finally {
      client.release(); 
    }
  }
}

export default AuthService;
