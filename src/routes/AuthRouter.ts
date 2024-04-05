import { Elysia } from "elysia";
import { AuthController } from "@/controllers/index";
import { AuthService } from "@/services/index";
import { extendRoute } from "@/utils/elysia-strategy";

const auth = new Elysia({ prefix: "/auth" });
const controller = new AuthController();
const service = new AuthService();

auth
  .post("/login", extendRoute(controller.login))
  .post("/logout", extendRoute(controller.logout))
  .post("/register", extendRoute(controller.register));

export default auth;

// Solution 2:

// Add this in all your classes, so you don;t  have to manually add the extendRoute method to all your routes.:

/*
  [key: string]: any;

  constructor() {
    for (const key of Object.getOwnPropertyNames(AuthController.prototype)) {
      const method = this[key];
      if (typeof method === "function" && key !== "constructor") {
        this[key] = extendRoute(method);
      }
    }
  }

  */
