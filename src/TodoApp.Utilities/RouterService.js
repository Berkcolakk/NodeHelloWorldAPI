module.exports = ((myCustomRoutes) => {
  let express = require("express");
  let router = express.Router();
  let methods = Object.keys(myCustomRoutes); // getting methods ('get', 'post'... etc)
  let routesMethod = null;
  let url = null;

  for (i in methods) {
    routesMethod = Object.keys(myCustomRoutes[methods[i]]);
    for (j in routesMethod) {
      url = "/" + routesMethod[j];
      url +=
        "/:" + myCustomRoutes[methods[i]][routesMethod[j]].params.join("/:");
      console.log(url);
      router[methods[i]](
        url,
        myCustomRoutes[methods[i]][routesMethod[j]].controller
      );
    }
  }

  return router;
})();
