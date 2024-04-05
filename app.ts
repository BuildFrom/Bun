import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { swagger } from "@elysiajs/swagger";
import { user, auth, health } from "@/routes/index";
import { db } from "@/database/index";

const app = new Elysia();

db().then(async () => {
  app
    .use(cors())
    .use(staticPlugin())
    .use(swagger())
    .group("/api", (app) => {
      app.use(health);
      app.use(user);
      app.use(auth);
      return app;
    })
    .listen(process.env.PORT || 3000);
  console.log(
    `\n🦊 Elysia and Postgress is running at ${app.server?.hostname}:${app.server?.port}`
  );
});
