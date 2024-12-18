import allowedDomains from "./allowedDomains.json";

interface CorsConfig {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => void;
}

const corsConfig: CorsConfig = {
  origin: (origin, callback) => {
    /*
      Allow requests with no origin:
      if(!origin) return callback(null, true)
    */
    if (allowedDomains.domains.indexOf(origin || "") === -1) {
      return callback(new Error(allowedDomains.errorMessage), false);
    }
    return callback(null, true);
  },
};

export default corsConfig;
