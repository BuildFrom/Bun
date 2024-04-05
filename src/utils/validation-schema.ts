import * as z from "zod";
import { r } from "@/utils/index";

const loginSchema = z.object({
  username: r.usernameRule,
  password: r.passwordRule,
});

const registerSchema = z
  .object({
    name: r.nameSchema,
    username: r.usernameRule,
    email: r.emailRule,
    password: r.passwordRule,
    confirm_password: r.passwordRule,
  })
  .superRefine((data) => {
    if (data.password !== data.confirm_password) {
      return { confirm_password: "Passwords do not match" };
    }
    return data;
  });

const validate = {
  loginSchema,
  registerSchema,
};

export default validate;
