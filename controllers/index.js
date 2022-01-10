const index = async (fastify, options) => {
  fastify.get("/", async (request, reply) => {
    return reply.sendFile("index.html");
  });
};

module.exports = index;
