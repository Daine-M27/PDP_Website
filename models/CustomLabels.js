const mongoose = require("mongoose");

const customLabelSchema = mongoose.Schema({
  NumCircuits: String,
  NumOutlets: String,
  Company: String,
  Building: String,
  ProjectName:String,
  Location: String,
  PartNumber: String,  
  CustomCircuitInput: [],
  CustomLabelInput: []
}, { timestamps: true });

module.exports = mongoose.model(
  "customLabels",
  customLabelSchema,
  "customLabelCollection"
);