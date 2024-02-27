import { Router } from "express";
import { verifyPermission } from "../middlewares/auth.middleware";
import { createStore } from "../controllers/auth/store.controllers";
import { UserRolesEnum } from "../constants";
const router  = Router();

router.route('/').post( verifyPermission([UserRolesEnum.ADMIN]), createStore);
export default router;