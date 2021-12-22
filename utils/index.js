const PINO_CONFIG =
  process.env.NODE_ENV == "development"
    ? {
        prettyPrint: {
          colorize: true,
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
        },
      }
    : false;

const PORT = process.env.PORT || 3000;

const ENV_SCHEMA = {
  type: "object",
  required: [],
  properties: {
    PORT: {
      type: "string",
      default: 3000,
    },
    BASE_URL: {
      type: "string",
      default: "http://localhost:3000",
    },
  },
};

// const HTTPMethod = {
//   GET: "get",
//   POST: "post",
//   PUT: "put",
//   DELETE: "delete",
//   OPTIONS: "options",
//   PATCH: "patch",
//   HEAD: "head",
//   CONNECT: "connect",
//   TRACE: "trace",
// };

module.exports = { PORT, PINO_CONFIG, ENV_SCHEMA };
