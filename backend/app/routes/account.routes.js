const { authJwt } = require("../middlewares");
const controller = require("../controllers/account.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "authorization",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/account/deposit", [authJwt.verifyToken], controller.deposit);
  app.get("/api/account/balance", [authJwt.verifyToken], controller.getBalance);
  app.post(
    "/api/account/issue-cheque",
    [authJwt.verifyToken],
    controller.issueCheque
  );

  // Cancel cheque route
  app.post(
    "/api/account/cancel-cheque",
    [authJwt.verifyToken],
    controller.cancelCheque
  );
};
