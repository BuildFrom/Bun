import { Elysia } from "elysia";
import { HealthController } from "@/controllers/index";
import { extendRoute } from "@/utils/elysia-strategy";

const health = new Elysia({ prefix: "/health" });
const controller = new HealthController();

health.get("/info", extendRoute(controller.info));

export default health;
