const fs = require("fs");
const path = require("path");
const fp = require("fastify-plugin");

const extensions = [".js"];

const isController = ext => extensions.includes(ext);

const loadModule = path => {
  const module = require(path);
  if (typeof module === "function") return { module };

  if (typeof module === "object") return module;

  return;
};

const getControllers = dir => {
  let controllers = fs.readdirSync(dir, { withFileTypes: true });
  let output = [],
    cobj = [];
  for (let controller of controllers) {
    if (controller.isDirectory()) {
      getControllers(path.resolve(dir, controller.name));
    }
    if (controller.isFile()) {
      // console.log("Got a file");
      const { ext, name } = path.parse(controller.name);
      if (!isController(ext)) {
        console.log(`${controller.name} is not a controller!`);
        continue;
      }
      // if (name == "index") {
      //   console.log("Skipping index");
      //   continue;
      // }
      // let controllerPath = path.join(dir, name);
      let controllerPath = path.resolve(dir, controller.name);
      let loadedControllerFile = loadModule(controllerPath);
      output.push(...Object.values(loadedControllerFile));
      cobj.push({ name, modules: Object(loadedControllerFile) });
      // cobj.push(Object(loadedControllerFile));
    }
  }
  return { controllers: output, cobj };
};

const core = (instance, options, next) => {
  let { controllers, cobj } = getControllers(path.resolve(instance.app_root, "controllers"));
  controllers.forEach(controller => {
    // console.log(controller, options);
    try {
      instance.register(controller);
      next();
    } catch (error) {
      const { message } = error;
      next(new Error(`Mbx: error registering controller: ${message}`));
    }
  });
  let ctrls = [];
  cobj.forEach(cbj => {
    let tmp = Object.entries(cbj),
      mdls = [];
    Object.entries(tmp[1][1]).forEach(md => {
      mdls.push({ name: md[1].name, action: md[1] });
    });
    ctrls.push({ name: cbj.name, modules: mdls });
  });
  // instance.decorate("controllers", cobj);
  instance.decorate("controllers", ctrls);
  next();
};

module.exports = fp(core, { name: "Mbx" });
