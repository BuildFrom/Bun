import { Elysia } from "elysia";
import { AuthController } from "@/controllers/index";
import { AuthService } from "@/services/index";

const auth = new Elysia({ prefix: "/auth" });
const controller = new AuthController();
const service = new AuthService();

auth
  .get("/", () => controller.login())
  .get("/logout", () => controller.logout())
  .post("/register", () => controller.register());

export default auth;
