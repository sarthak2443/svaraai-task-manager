const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const controller = require("../controllers/project.controller");

router.use(auth);
router.post("/", controller.createProject);
router.get("/", controller.getProjects);
router.delete("/:id", controller.deleteProject);

module.exports = router;
