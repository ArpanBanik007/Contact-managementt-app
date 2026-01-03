import { Router } from "express";
import { 
  createContact, 
  getAllContacts, 
  updateContactName, 
  deleteContact 
} from "../controller/contact.controller.js";

const router = Router();

// Create a new contact
router.route("/addContacts").post(createContact);

// Get all contacts
router.route("/getContacts").get(getAllContacts);

// Update contact name by phone or email
router.route("/:identifier").patch(updateContactName);

// Delete contact by phone or email
router.route("/:identifier").delete(deleteContact);

export default router;