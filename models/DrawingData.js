const mongoose = require("mongoose");

const drawingDataSchema = mongoose.Schema({
  DrawingData: [
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
  ],
  Html: String,   
  HtmlStatus: Boolean,
  PartNumber: String
}, { timestamps: true });

module.exports = mongoose.model(
  "drawingData",
  drawingDataSchema,
  "drawingDataCollection"
);