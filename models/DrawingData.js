const mongoose = require("mongoose");

const drawingDataSchema = mongoose.Schema(
  {
    bomData: [
      {
        Description: String,
        OrderBy: Number,
        PartNo: String,
        Qty: Number,
        Weight: Number,
      },
    ],
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
        ExcludeFromPartNumber: String,
      },
    ],
    partNumber: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "drawingData",
  drawingDataSchema,
  "drawingDataCollection"
);
