import asyncHandler from "../utils/asyncHandler.js";
import contactModels from "../models/contact.models.js";
import ApiResponse from "../utils/ApiResponse.js";



const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;

  // required fields check
  if (!name || !email || !phone) {
    throw new ApiError(400, "Name, Email and Phone are required");
  }

  // duplicate email or phone check
  const existingContact = await contactModels.findOne({
    $or: [{ email }, { phone }]
  });

  if (existingContact) {
    throw new ApiError(409, "Contact already exists");
  }

  // create contact
  const newContact = await contactModels.create({
    name,
    email,
    phone,
    message: message || ""
  });

  return res
    .status(201)
    .json(
      new ApiResponse(201, newContact, "Contact created successfully")
    );
});


const updateContactName = asyncHandler(async (req, res) => {
  const { identifier } = req.params;
  const { name } = req.body;

  if (!name) {
    throw new ApiError(400, "Name is required for update");
  }

  const updatedContact = await contactModels.findOneAndUpdate(
    { phone: identifier }, // phone দিয়ে search
    { name },
    
    { new: true, runValidators: true }
  );

  if (!updatedContact) {
    throw new ApiError(404, "Contact not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedContact, "Contact name updated successfully")
    );
});


const deleteContact = asyncHandler(async (req, res) => {
  const { identifier } = req.params; // phone or email

  const deletedContact = await contactModels.findOneAndDelete({
    $or: [{ phone: identifier }, { email: identifier }]
  });

  if (!deletedContact) {
    throw new ApiError(404, "Contact not found");
  }

  return res.status(200).json(
    new ApiResponse(200, deletedContact, "Contact deleted successfully")
  );
});
   

const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await contactModels.find().sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, contacts, "Contacts fetched successfully")
  );
});


export{
    createContact,
    updateContactName,
    deleteContact,
    getAllContacts
}