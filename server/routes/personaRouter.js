const express = require("express");
const uploadMemory = require("../middlewares/multerUpload");
const { checkUser } = require("../middlewares/checkUser");
const {
  createPersona,
  getUserPersonas,
  getPersonaById,
  updatePersona,
  deletePersona,
  generatePersonaSummary,
  createPersonaFromResume,
} = require("../controllers/personaController");

const personaRouter = express.Router();

// CRUD routes for personas
personaRouter.post("/create", checkUser, createPersona);
personaRouter.post("/generate-summary", checkUser, generatePersonaSummary);
personaRouter.post("/from-resume", checkUser, createPersonaFromResume);
personaRouter.get("/user-personas", checkUser, getUserPersonas);
personaRouter.get("/:id", checkUser, getPersonaById);
personaRouter.put("/:id", checkUser, updatePersona);
personaRouter.delete("/:id", checkUser, deletePersona);

module.exports = personaRouter;
