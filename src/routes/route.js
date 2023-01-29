const express = require("express")
const { course, updateCourse, deleteCourse } = require("../controllers/adminController")
const { employeeCourse } = require("../controllers/employeeController")
const { approve } = require("../controllers/superAdminController")
const { user, login } = require("../controllers/userController")
const { authentication, admin, superAdmin, employee } = require("../middleware/middleware")
const router = express.Router()

router.post("/user", user)
router.post("/login", login)


router.post("/course", authentication, admin, course)
router.put("/course/:courseId", authentication, admin, updateCourse)
router.delete("/course/:courseId", authentication, admin, deleteCourse)


router.put("/course/:courseId/approve", authentication, superAdmin, approve)


router.get("/course", authentication, employee, employeeCourse)


router.all("/*", function (req, res) { res.status(404).send({ status: false, msg: "Invalid HTTP request" }) })

module.exports = router