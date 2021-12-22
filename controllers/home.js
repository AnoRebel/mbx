const home = async (fastify, options) => {
  fastify.get("/home", async (request, reply) => {
    reply.send({ home: "run" });
  });
};

const test = async (fastify, options) => {
  fastify.get("/test", async (request, reply) => {
    reply.send({ ping: "pong" });
  });
};

module.exports = { home, test };
