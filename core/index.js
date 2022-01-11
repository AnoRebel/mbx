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
      cobj.push({ name, controllers: Object(loadedControllerFile) });
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
  // console.log("Controllers: ", Object.entries(cobj[0])[0][1].name);
  let ctlrs = [];
  cobj.forEach(cbj => {
    let tmp = Object.entries(cbj);
    console.log("Tmp: ", cbj);
    tmp.forEach(dt => {
      // console.log(`${dt[0]} - ${dt[1].name} : ${dt[1]}`);
      let nm = dt[1].name;
      ctlrs.push(nm);
    });
  });
  instance.decorate("controllers", cobj);
  // instance.decorate("controllers", ctlrs);
  next();
};

module.exports = fp(core, { name: "Mbx" });
