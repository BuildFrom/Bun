import { db } from "@/database/index";

class UserService {
  async fetchUser(userId: any) {
    const client = await db();
    try {
      const { rows } = await client.query(
        "SELECT * FROM Users WHERE userId = $1",
        [userId]
      );
      return rows.length === 0 ? null : rows[0];
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    } finally {
      client.release();
    }
  }

  async updateDB(
    userId: any,
    updatedUserData: { name: any; username: any; email: any; role: any }
  ) {
    const client = await db();
    try {
      const { rows } = await client.query(
        "SELECT * FROM Users WHERE userId = $1",
        [userId]
      );
      if (rows.length === 0) {
        return { error: "User does not exist in the database" };
      }
      const existingUser = rows[0];
      if (
        existingUser.name === updatedUserData.name &&
        existingUser.username === updatedUserData.username &&
        existingUser.email === updatedUserData.email &&
        existingUser.role === updatedUserData.role
      ) {
        return { upToDate: true };
      }
      await client.query(
        "UPDATE Users SET name = $1, username = $2, email = $3, role = $4 WHERE userId = $5",
        [
          updatedUserData.name,
          updatedUserData.username,
          updatedUserData.email,
          updatedUserData.role,
          userId,
        ]
      );
      return { success: true };
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    } finally {
      client.release();
    }
  }

  async updatePassword(userId: any, newPassword: any) {
    const client = await db();
    try {
      const hashedPassword = await Bun.password.hash(newPassword.password, {
        algorithm: "bcrypt",
      });

      await client.query("UPDATE Users SET password = $1 WHERE userId = $2", [
        hashedPassword,
        userId,
      ]);
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    } finally {
      client.release();
    }
  }

  static async getAllUsers() {
    const client = await db();
    try {
      const { rows } = await client.query(
        "SELECT userId, username, email FROM users"
      );
      return rows;
    } catch (error) {
      console.error("Error retrieving users:", error);
      throw error;
    } finally {
      client.release();
    }
  }

  async deleteUser(userId: any) {
    const client = await db();
    try {
      await client.query("DELETE FROM Users WHERE userId = $1", [userId]);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    } finally {
      client.release();
    }
  }
}

export default UserService;
