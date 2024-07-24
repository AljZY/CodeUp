const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/adminController");
const { editPost } = require("../controllers/adminController");
const upload = require("../middleware/uploadMiddleware");

adminRouter.get("/admin", (req, res) => {
  res.render("admin/adminHomepage");
});

adminRouter.get("/allUser", adminController.fetchAllUsers);
adminRouter.get("/allPoser", adminController.fetchAllPosers);
adminRouter.get("/allPost", adminController.fetchAllPosts);

adminRouter.delete("/user/deleteUser/:id", adminController.deleteUser);
adminRouter.delete("/poser/deletePoser/:id", adminController.deletePoser);
adminRouter.delete("/post/deletePost/:id", adminController.deletePost);
adminRouter.put("/post/editPost/:id", upload.single("poserImage"), editPost);

module.exports = adminRouter;
