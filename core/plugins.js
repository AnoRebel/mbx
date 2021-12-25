const fp = require("fastify-plugin");
const path = require("path");
const qs = require("qs");

const { ENV_SCHEMA } = require("../utils");

const ENV_OPTIONS = {
  confKey: "config",
  schema: ENV_SCHEMA,
  dotenv: true,
};

const plugins = (instance, options, done) => {
  instance
    .register(require("fastify-env"), ENV_OPTIONS)
    .register(require("fastify-cors"), instance => (req, callback) => {
      let corsOptions;
      const origin = req.headers.origin;
      // do not include CORS headers for requests from localhost
      if (/localhost/.test(origin)) {
        corsOptions = { origin: false };
      } else {
        corsOptions = { origin: true };
      }
      callback(null, corsOptions); // callback expects two parameters: error and options
    })
    .register(require("fastify-qs"), {})
    .register(require("fastify-axios"), {
      baseURL: process.env.BASE_URL,
    })
    .register(require("fastify-helmet"))
    .register(require("fastify-multipart"))
    .register(require("fastify-rate-limit"), {
      max: 100,
      timeWindow: "1 minute",
    })
    .register(require("fastify-minify"), {
      cache: 2000,
    })
    .register(require("fastify-compress"), {
      onUnsupportedEncoding: (encoding, request, reply) => {
        reply.code(406);
        return `We do not support the ${encoding} encoding.`;
      },
    })
    .register(require("fastify-formbody"), {
      parser: str => qs.parse(str),
    })
    .register(require("fastify-jwt"), {
      secret: "mbx",
    })
    .register(require("fastify-static"), {
      root: path.join(instance.app_root, "app"),
    });
  done();
};

module.exports = fp(plugins, { name: "CorePlugins" });
