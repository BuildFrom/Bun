// start off with controllers
// but eventually routes must only accept services
// controllers: logic
// services: pass logic, design database queries

export { default as user } from "./UserRouter";
export { default as auth } from "./AuthRouter";
export { default as health } from "./HealthRouter";