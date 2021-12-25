const { PORT, PINO_CONFIG } = require("./utils");
const fastify = require("fastify")({ logger: PINO_CONFIG });
const FastifyVite = require("fastify-vite");
const renderer = require("fastify-vite-vue");
const path = require("path");

const dev = process.env.NODE_ENV === "development";

const main = async () => {
  await fastify.register(FastifyVite, {
    api: true,
    root: __dirname,
    renderer,
    vite: {
      build: {
        outDir: path.resolve(__dirname, "api"),
        minify: !dev,
      },
    },
  });
  await fastify.decorate("app_root", path.resolve(__dirname));
  await fastify.register(require("./core/plugins"));
  await fastify.register(require("./core"));
  await fastify.vite.commands();
  await fastify.vite.ready();
  return fastify;
};

if (require.main === module) {
  main().then(fastify => {
    fastify.listen(PORT, err => {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }
      console.log(fastify.app_root, fastify.config);
    });
  });
}

module.exports = main;
