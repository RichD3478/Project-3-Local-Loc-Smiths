const router = require("express").Router();
const locsSmithRoutes = require("./locsSmith");

router.use("/locsSmith", locsSmithRoutes);

module.exports = router;