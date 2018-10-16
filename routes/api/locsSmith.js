const router = require("express").Router();
const locsSmithController = require("../../client/controllers/locsSmithController");

router.route("/")
  .get(locsSmithController.findAll)
  .post(locsSmithController.create);

router
  .route("/:id")
  .get(locsSmithController.findById)
  .put(locsSmithController.update)
  .delete(locsSmithController.remove);

module.exports = router;