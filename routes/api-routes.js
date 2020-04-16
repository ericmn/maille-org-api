// api-routes.js
// Initialize express router
let router = require("express").Router();

// Set default API response
//router.get('/', function (req, res) {
//    res.json({
//        status: 'API Its Working',
//        message: 'Welcome to RESTHub crafted with love!',
//    });
//});
const searchValidator = require("../validators/searchValidator");

const weaveController = require("../controllers/weaveController");
router
  .route("/weaves")

  .get(
    searchValidator.validate,
    searchValidator.reject,
    searchValidator.sanitize,
    weaveController.search
  )
  .post(weaveController.new)
  .delete(weaveController.delete);
router
  .route("/weaves/:id")
  .get(weaveController.fetch)
  .delete(weaveController.delete);

module.exports = router;
