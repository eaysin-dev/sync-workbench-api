const defaultConfig = Object.freeze({
  publicRoute: [
    "/",
    "/api/v1/auth/login",
    "/api/v1/auth/register",
    "/api/v1/auth/refresh-token",
    "/docs",
  ],
  allowedUserPopulateFields: ["role"],
  allowUserRoles: ["hr", "admin", "manager", "employee"],
});

export default defaultConfig;
