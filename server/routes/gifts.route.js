const router = require("express").Router();
const giftsController = require("../controllers/gifts.controller");
const {
  tokenMiddleware,
  adminMiddleware,
} = require("../middlewares/token.middleware");

router.get("/", giftsController.getAll);
router.get("/:uuid", giftsController.getOne);
router.post("/", [tokenMiddleware, adminMiddleware], giftsController.addGift);

module.exports = router;
