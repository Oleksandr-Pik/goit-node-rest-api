import express from "express";

import {
  createContactSchema,
  updateContactSchema,
  contactFavoriteSchema,
} from "../models/Contact.js";

import { validateBody } from "../helpers/index.js";

import { authenticate, isEmptyBody, isValidId } from "../middlewares/index.js";

import contactsController from "../controllers/contactsController.js";

const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} = contactsController;

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactFavoriteSchema),
  updateContact
);

export default contactsRouter;
