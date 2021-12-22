const index = async (fastify, options) => {
  fastify.get("/", async (request, reply) => {
    return reply.sendFile("index.html");
  });
};

const _index = async (fastify, options) => {
  fastify.get("/api", async (request, reply) => {
    let controllers = fastify.controllers;
    return reply.view("layouts/base.njk", { data: "Mabrex", controllers });
  });
};

module.exports = { index, _index };
