import express from "express";

import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

import {validateBody} from '../helpers/index.js';

import { isEmptyBody } from "../middlewares/index.js";

import contactsControllers from "../controllers/contactsControllers.js";

const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} = contactsControllers;

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", isEmptyBody, validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", isEmptyBody, validateBody(updateContactSchema), updateContact);

export default contactsRouter;
