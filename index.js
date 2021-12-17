const fastify = require("fastify")({ logger: true });
const qs = require("qs");

const PORT = process.env.PORT || 3000;
const SCHEMA = {
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
const ENV_OPTIONS = {
    confKey: "config",
    schema: SCHEMA,
    dotenv: true,
};

fastify.register(require("fastify-cors"), (instance) => (req, callback) => {
    let corsOptions;
    const origin = req.headers.origin;
    // do not include CORS headers for requests from localhost
    if (/localhost/.test(origin)) {
        corsOptions = { origin: false };
    } else {
        corsOptions = { origin: true };
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
});

fastify.register(require("fastify-env"), ENV_OPTIONS).ready((err) => {
    if (err) fastify.log.error(err);
    console.log("Config: ", fastify.config);
});

fastify.register(require("fastify-helmet"));
fastify.register(require("fastify-multipart"));
fastify.register(require("fastify-rate-limit"), {
    max: 100,
    timeWindow: "1 minute",
});
fastify.register(require("fastify-compress"), {
    onUnsupportedEncoding: (encoding, request, reply) => {
        reply.code(406);
        return "We do not support the " + encoding + " encoding.";
    },
});
fastify.register(require("fastify-formbody"), {
    parser: (str) => qs.parse(str),
});
// fastify.setNotFoundHandler({
  // preHandler: fastify.rateLimit()
// }, function (request, reply) {
  // reply.code(404).send({ hello: 'world' })
// })

fastify.get("/", async (req, rep) => {
    console.log("Request: ", req);
    rep.send({ hello: "world" });
});

const start = async () => {
    try {
        await fastify.listen(PORT);
        // console.log(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
