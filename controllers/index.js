const index = async (fastify, options) => {
  fastify.get("/", async (request, reply) => {
    return reply.sendFile("index.html");
  });
  fastify.get("/favicon.ico", (_, reply) => {
    reply.code(204);
    reply.send();
  });
};

module.exports = index;
