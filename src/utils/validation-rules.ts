import * as z from "zod";

const nameSchema = z.string().min(6);

const usernameRule = z
  .string()
  .min(4, "Username needs to be at least 4 characters")
  .max(20, "Username can't be longer than 20 characters")
  .regex(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers");

const emailRule = z
  .string()
  .email("Invalid email")
  .regex(
    /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Email can only contain letters and numbers"
  );

const passwordRule = z
  .string()
  .min(8, "Password needs to be at least 8 characters");

const r = {
  nameSchema,
  usernameRule,
  emailRule,
  passwordRule,
};

export default r;
