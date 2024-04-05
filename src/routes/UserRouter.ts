import { Elysia } from "elysia";
import { UserController } from "@/controllers/index";
import { UserService } from "@/services/index";

const user = new Elysia({ prefix: "/user" });
const controller = new UserController();
const service = new UserService();

user
  .get("/", () => controller.getAll)
  .get("/:id", ({ params }) => `Get One: ${params.id}`)
  .post("/", ({ body }) => `Create: ${JSON.stringify(body)}`)
  .patch(
    "/:id",
    ({ params, body }) => `Update: ${params.id} ${JSON.stringify(body)}`
  )
  .put(
    "/:id",
    ({ params, body }) => `Update: ${params.id} ${JSON.stringify(body)}`
  )
  .delete("/:id", ({ params }) => `Delete: ${params.id}`);

export default user;
