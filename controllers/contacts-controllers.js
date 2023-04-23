const { HttpError } = require("../helpers/index");
const { ctrlWrapper } = require("../utils");

const { Contact } = require("../models/contact");

const getAllContacts = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
    res.json(result)
};

const getContactById = async (req, res) => {
    const { id } = req.params;
  // const result = await Contact.findOne({_id: id });
  const result = await Contact.findById(id);
    if (!result) {
      throw HttpError(404, `Contact with ${id} not found`)
    }
    res.json(result)
};

const addContact = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

const removeContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      throw HttpError(404, `Contact with ${id} not found`)
    }
    res.json({ message: "contact deleted" })
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`)
  }
  res.json(result)
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
  if (!result) {
    throw HttpError(404, "Not found")
  }
  res.json(result)
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
}