const mongoose = require("mongoose");

const quoteRequestSchema = mongoose.Schema({
  ProjectName: String,
  ProjectAddress: String,
  CustomerName:String,
  CustomerCompany: String,
  CustomerAddress: String,
  ContactEmail: String,
  ContactPhoneNumber: String,
  IsBidJob: String,
  QuoteItems: [
    {
      PartNumber: String,
      Quantity: String
    }
  ],
  DateCreated: String
});

module.exports = mongoose.model(
  "quoteRequest",
  quoteRequestSchema,
  "quoteRequestCollection"
);
