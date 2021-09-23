const tempReqObject = {
  color: "B",
  dataInput: "X",
  dataOutput: "X",
  dataPowerLocation: "I",
  dmxUniverses: "1",
  endCap: "R",
  leadWhipLength: "6",
  numberOfCircuits: "4",
  numberOfOutlets: "3",
  outletSpacing: "16",
  partNumber: "PDP1.5B240-4L1EX15-EX16R",
  pipeLength: "48",
  pipeSize: "1.5",
  powerInputPosition: "T",
  powerInput: "W1",
  powerOutput: "E",
};

const tempBomObject = [
  {
    itemNo: '1',
    partNo: 'PDP1.5-96-6-16-M-1',
    description: 'BATTEN, 1.5" SCH 80 X 96 - 6 RECP. MILL',
    qty: '2'
  },
  {
    itemNo: '2',
    partNo: 'PDP-K-PDM-E5XLR-INPT',
    description: 'BATTEN, 1.5" SCH 80 X 96 - 6 RECP. MILL',
    qty: '2'
  },
  {
    itemNo: '3',
    partNo: 'PDP1.5-96-6-16-M-1',
    description: 'BATTEN, 1.5" SCH 80 X 96 - 6 RECP. MILL',
    qty: '11'
  },
  {
    itemNo: '4',
    partNo: 'PDP1.5-96-6-16-M-1',
    description: 'WIRE LEADS, LEFT',
    qty: '2'
  },
  {
    itemNo: '5',
    partNo: 'PDP1.5-96-6-16-M-1',
    description: 'BATTEN, 1.5" SCH 80 X 96 - 6 RECP. MILL',
    qty: '2'
  },
  {
    itemNo: '6',
    partNo: 'PDP1.5-96-6-16-M-1',
    description: 'BATTEN, 1.5" SCH 80 X 96 - 6 RECP. MILL',
    qty: '2'
  },
  {
    itemNo: '7',
    partNo: 'PDP1.5-96-6-16-M-1',
    description: 'BATTEN, 1.5" SCH 80 X 96 - 6 RECP. MILL',
    qty: '2'
  },
  {
    itemNo: '8',
    partNo: 'PDP1.5-96-6-16-M-1',
    description: 'BATTEN, 1.5" SCH 80 X 96 - 6 RECP. MILL',
    qty: '2'
  },
  {
    itemNo: '9',
    partNo: 'PDP1.5-96-6-16-M-1',
    description: 'BATTEN, 1.5" SCH 80 X 96 - 6 RECP. MILL',
    qty: '2'
  },
  {
    itemNo: '10',
    partNo: 'PDP1.5-96-6-16-M-1',
    description: 'BATTEN, 1.5" SCH 80 X 96 - 6 RECP. MILL',
    qty: '2'
  }
]

const tempSpecificationsObject = {
  color: 'SEMI-GLOSS BLACK',
  pipeSize: '1.5',
  pipeLength: '192',
  powerInput: 'CONDUIT BOX',
  leadLength: 'N/A',
  dataInput: '5-PIN XLR',
  dataOutput: '5-PIN XLR',
  numOutputs: '15',
  outputSpacing: '16',
  numCircuits: '3'
}

const tempCustomLabelObject = [
  {
    specifyCircuit: "z",
    customLabel: "Red12345"
  },
  {
    specifyCircuit: "z",
    customLabel: "Red2"
  },
  {
    specifyCircuit: "z",
    customLabel: "Red3"
  },
  {
    specifyCircuit: "z",
    customLabel: "Red4"
  },
  {
    specifyCircuit: "z",
    customLabel: "Red5"
  },
  {
    specifyCircuit: "z",
    customLabel: "Red6"
  },
  {
    specifyCircuit: "z",
    customLabel: "Red7"
  },
  {
    specifyCircuit: "z",
    customLabel: "Red8"
  },
  {
    specifyCircuit: "z",
    customLabel: "Red9"
  },
  {
    specifyCircuit: "z",
    customLabel: "Red10"
  },
  {
    specifyCircuit: "z",
    customLabel: "Red11"
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: "20"
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "25",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: "30"
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: "40"
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: "50"
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: "60"
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: "65"
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: ""
  },
  {
    specifyCircuit: "",
    customLabel: "The End"
  },
]


module.exports = { tempReqObject, tempSpecificationsObject, tempBomObject, tempCustomLabelObject }
