import { Router } from "express";
import { AuthController } from "../controllers/authController.js";
const router = Router();
const controller = new AuthController();
/**
 * POST /api/auth/login
 */
router.post("/login", async (req, res, next) => {
    try {
        const result = await controller.login(req.body);
        return res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
export { router as authRoutes };
//# sourceMappingURL=authRoutes.js.map