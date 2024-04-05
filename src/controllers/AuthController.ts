import validate from "@/utils/validation-schema";
import AuthService from "@/services/AuthService";
import { HttpResponse } from "@/utils/elysia-strategy";

const authService = new AuthService();

class AuthController {
  async register(httpRequest: any): Promise<HttpResponse> {
    // Check if the data is an object
    const data = httpRequest;
    if (typeof data !== "object" || data === null || Array.isArray(data)) {
      throw new Error("Invalid data format. Expected an object.");
    }

    // Validate the incoming data
    const validation = validate.registerSchema.safeParse(data);
    if (!validation.success) {
      const error = validation.error.errors[0];
      console.log(error.message);
      return {
        statusCode: 400,
        data: error.message,
      };
    }

    // Check if the user already exists
    const verifyNewUser = await authService.registerDefaultUser(data);
    if (verifyNewUser) {
      console.log(verifyNewUser);
      return {
        statusCode: 400,
        data: verifyNewUser,
      };
    }

    // Register the user
    return {
      statusCode: 200,
      data,
    };
  }

  async login(httpRequest: any): Promise<HttpResponse> {
    return {
      statusCode: 201,
      data: "Login successful!",
    };
  }

  async logout(httpRequest: any): Promise<HttpResponse> {
    return {
      statusCode: 200,
      data: "Logout successful!",
    };
  }
}

export default AuthController;
