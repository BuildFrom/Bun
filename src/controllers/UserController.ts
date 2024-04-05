import { HttpResponse } from "@/utils/elysia-strategy";

class UserController {
  async getAll(): Promise<HttpResponse> {
    return {
      data: "Get all users",
      statusCode: 200,
    };
  }
}

export default UserController;
