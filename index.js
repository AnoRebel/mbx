const path = require("path");
const { PORT, PINO_CONFIG } = require("./utils");
const fastify = require("fastify")({
  logger: PINO_CONFIG,
});

fastify.decorate("app_root", path.resolve(__dirname));
// fastify.addHook("onRequest", async (request, reply) => {
// try {
// await request.jwtVerify()
// } catch (err) {
// reply.send(err)
// }
// })
// fastify.setNotFoundHandler({
// preHandler: fastify.rateLimit()
// }, function (request, reply) {
// reply.code(404).send({ hello: 'world' })
// })

fastify.register(require("./core/plugins"));
fastify.register(require("./core"));

const start = async () => {
  try {
    await fastify.listen(PORT);
    // console.log(fastify.routes);
    // console.log(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
