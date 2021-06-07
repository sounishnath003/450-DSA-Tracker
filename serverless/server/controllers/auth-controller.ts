import { Router } from "express";

const router = Router();

router.get("/", async (req: any, res: any, next: any) => {
  res.status(200).send({
    message: req.oidc.isAuthenticated() ? `Logged In` : "Logged Out",
    data: { ...req.oidc.user },
  });

  next();
});

export default router;
