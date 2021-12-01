const mongoose = require("mongoose");

const drawingDataSchema = mongoose.Schema({
  drawingData: [
    {
      ComponentTypeName: String,
      OrderOfAppearance: String,
      ProductComponentTypeID: String,
      CatalogDescription: String,
      CatalogID: String,
      CatalogIdentifierID: String,
      ChildDecisionNodeID: String,
      ParentDecisionNodeID: String
    }
  ]
});

module.exports = mongoose.model(
  "drawingData",
  drawingDataSchema,
  "drawingDataCollection"
);