declare global {
  namespace App {
    interface Platform {
      env: Env;
      cf: CfProperties;
      ctx: ExecutionContext;
    }
    interface Locals {
      db: ReturnType<typeof import("$lib/server/db").initDb>;
    }
  }
}

export {};
