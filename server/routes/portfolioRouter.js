const express = require("express");
const {
  getProjects,
  createPortfolio,
  uploadProjectImage,
  getPortfolioBySlug,
  getMyPortfolio,
  updatePortfolio,
} = require("../controllers/portfolioController");
const { checkUser } = require("../middlewares/checkUser");
const upload = require("../middlewares/multerUpload");

const portfolioRouter = express.Router();

// Protected routes (require authentication)
portfolioRouter.get("/projects", checkUser, getProjects);
portfolioRouter.post("/create", checkUser, createPortfolio);
portfolioRouter.put("/update", checkUser, updatePortfolio);
portfolioRouter.post(
  "/upload-image",
  checkUser,
  upload.single("image"),
  uploadProjectImage
);
portfolioRouter.get("/my", checkUser, getMyPortfolio);

// Public route (no auth required)
portfolioRouter.get("/:slug", getPortfolioBySlug);

module.exports = portfolioRouter;
