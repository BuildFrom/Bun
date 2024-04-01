import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { swagger } from "@elysiajs/swagger";
import { user, auth } from "@/routes/index";
import { db } from "@/database/index";
import { jwt } from "@elysiajs/jwt";

const app = new Elysia();

db().then(async () => {
  app
    .use(cors())
    .use(staticPlugin())
    .use(swagger())
    .group("/api", (app) => {
      app.use(user);
      app.use(auth);
      return app;
    })
    .listen(process.env.PORT || 3000);
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
});
