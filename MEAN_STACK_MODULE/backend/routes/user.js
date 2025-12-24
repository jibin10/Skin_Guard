const express = require("express");

const UserController = require("../controllers/user");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login", UserController.userLogin);

router.get('/', checkAuth, UserController.getUsers);
router.get('/other/', checkAuth, UserController.getOtherUsers);

router.get("/:id", checkAuth, UserController.getUser);

router.get("/user_role/:user_id", checkAuth, UserController.getUserRole);
router.put("/user_role/:user_id", checkAuth, UserController.updateUserRole);
router.put("/user_password/:user_id", checkAuth, UserController.updatePassword);


module.exports = router;
