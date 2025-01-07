namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "dev" | "production";
    PORT: number;
    HOST: string;
    DB_URI: string;
  }
}
