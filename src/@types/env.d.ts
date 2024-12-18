namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "dev" | "production";
    PORT: number;
    HOST: string;
    DEV_DB_URI: string;
    PROD_DB_URI: string;
  }
}
