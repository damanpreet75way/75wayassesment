import { Router } from "express";
import { UserRolesEnum } from "../../constants";
import { loginUser,registerUser } from "../../controllers/auth/user.controllers";


const router  = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser)

export default router;