const mongoose = require("mongoose");

const drawingDataSchema = mongoose.Schema({
  partNumber: String,
  drawingData: [
    {
      ComponentTypeName: String,
      OrderOfAppearance: String,
      ProductComponentTypeID: String,
      CatalogDescription: String,
      CatalogID: String,
      CatalogIdentifierID: String,
      ChildDecisionNodeID: String,
      ParentDecisionNodeID: String,
      ExcludeFromPartNumber: String
    }
  ]  
}, { timestamps: true });

module.exports = mongoose.model(
  "drawingData",
  drawingDataSchema,
  "drawingDataCollection"
);