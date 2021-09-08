const { sheetOne } = require('../utilities/sheetBuilder')
const express = require('express');
const { json } = require('express');
const router = express.Router();

const tempReqObject = {
  color: "B",
  dataInput: "X",
  dataOutput: "X",
  dmxUniverses: "1",
  endCap: "R",
  leadWhipLength: "36",
  numberOfCircuits: "4",
  numberOfOutlets: "15",
  outletSpacing: "16",
  partNumber: "PDP1.5B240-4L1EX15-EX16R",
  pipeLength: "240",
  pipeSize: "1.5",
  powerInputPosition: "E",
  powerInput: "S1",
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
class Sheet {
  constructor( obj, sheetNumber ) {
      Object.assign(this, obj)
      this.sheetNumber = sheetNumber;
      this.date = new Date().toLocaleDateString();
      this.drawnBy = 'DM';
      this.mainDrawing = {};
      this.bomItems = [];
      this.specifications = {};
    }
}

/* GET drawing page. */
router.get('/', function(req, res) {  
  const sheet1 = new Sheet(tempReqObject, 'SHEET 1 OF 2')
  sheet1.mainDrawing = sheetOne(sheet1)
  sheet1.bomItems = [...tempBomObject]
  sheet1.specifications = JSON.parse(JSON.stringify(tempSpecificationsObject))

  const sheet2 = new Sheet(tempReqObject, 'SHEET 2 OF 2')
  
  
  console.log(sheet1.bomItems);
  res.render('drawing', { title: 'DrawingPage', sheets: { sheet1, sheet2 } });
});

module.exports = router;

// ----Drawing submission object type---- //

// let inputParams = {
//   "color": "",
//   "dataInput": "",
//   "dataOutput": "", // may not needed with new design
//   "dmxUniverses": "", // changed from original
//   "endCap": "",
//   "leadWhipLength": "",
//   "numberOfCircuits": "",
//   "numberOfOutlets": "", // may not be needed
//   "outletSpacing": "",
//   "partNumber": "",
//   "pipeLength": "",
//   "pipeSize": "",
//   "powerInputPosition": "",
//   "powerInput": "",
//   "powerOutput": ""
// }





// {
//   'partNumber': 'PDP1.5B608-2W1EX38-EX16R',
//   'pageNumber': 'SHEET 1 of 3',
//   'drawnBy': 'DM',
//   'drawnByDate': '08/23/2021',
//   'mainDrawing': {
//     'mainTransform': 'matrix(1 0 0 1 250 600)',
//     'elements' : [
//       { 
//         'transform': 'matrix(1 0 0 1 0 0)', 
//         'paths': [
//           {
//             'd':'m0.2684 28.8196v-28.5512h240.002v28.5512zm65.625-4.50726v0h48.75c0.2732 0 0.5383-0.0296 0.7969-0.086 0.1294-0.0281 0.2571-0.0625 0.3808-0.10363 0.1237-0.041 0.2438-0.0887 0.3594-0.1408 0.2312-0.10411 0.449-0.22975 0.6465-0.37153 0.1975-0.14182 0.3765-0.29936 0.539-0.47125s0.3077-0.36045 0.4336-0.5573c0.1258-0.19688 0.2344-0.40315 0.3223-0.62183 0.044-0.10937 0.083-0.22242 0.1172-0.33634 0.034-0.114 0.061-0.22908 0.084-0.34611 0.046-0.23404 0.07-0.47439 0.07-0.72155v-12.022c-1e-4 -0.24667-0.024-0.48877-0.07-0.72155-0.046-0.23343-0.1129-0.46058-0.2012-0.6805-0.088-0.21991-0.1947-0.42727-0.3203-0.62377-0.1256-0.19651-0.2702-0.38224-0.4336-0.55535-0.1633-0.17299-0.3434-0.33053-0.5391-0.47125-0.1957-0.1407-0.4069-0.26568-0.6406-0.37154-0.2338-0.10574-0.4805-0.18918-0.7402-0.24638-0.1298-0.0285-0.2639-0.0496-0.3985-0.0645-0.1346-0.015-0.2694-0.0215-0.4062-0.0215v-2e-3h-48.752v2e-3c-0.2732 0-0.5402 0.0296-0.7988 0.086-0.1294 0.0281-0.2572 0.0625-0.3809 0.10363-0.1237 0.041-0.2438 0.0888-0.3594 0.1408-0.2313 0.10412-0.449 0.22976-0.6465 0.37153-0.1975 0.14181-0.3765 0.29939-0.539 0.47126-0.1626 0.17187-0.3078 0.35846-0.4336 0.55534-0.1261 0.19686-0.2324 0.40511-0.3203 0.62378-0.044 0.10937-0.083 0.22241-0.1172 0.33634-0.034 0.114-0.063 0.22905-0.086 0.34611-0.046 0.23342-0.07 0.4731-0.07 0.71959v12.024c0 0.24738 0.024 0.48815 0.07 0.72155 0.046 0.23343 0.1129 0.46057 0.2012 0.68049 0.088 0.2199 0.1967 0.42729 0.3223 0.62379 0.1256 0.19649 0.2702 0.38223 0.4336 0.55533 0.1633 0.17301 0.3414 0.33053 0.5371 0.47127 0.1957 0.14069 0.4089 0.26568 0.6426 0.37153 0.2338 0.10574 0.4785 0.18722 0.7382 0.24443 0.1297 0.0285 0.2639 0.0516 0.3985 0.0665 0.1339 0.0149 0.2701 0.0214 0.4062 0.0215zm-50.6269-6.59762c0.2088 1.2e-4 0.4142-0.0204 0.6172-0.0607 0.2029-0.0405 0.4046-0.10044 0.5957-0.1799 0.191-0.0794 0.3725-0.1781 0.5449-0.29332 0.086-0.0577 0.1719-0.11998 0.2519-0.18576 0.08-0.0657 0.1558-0.1346 0.2286-0.20727 0.1455-0.14538 0.2767-0.30584 0.3925-0.47909 0.1159-0.17319 0.2138-0.35488 0.293-0.54556 0.079-0.19066 0.1408-0.3919 0.1816-0.59641 0.041-0.20444 0.061-0.41169 0.061-0.62183 0-0.21011-0.021-0.41685-0.061-0.61987-0.02-0.10149-0.045-0.20138-0.076-0.30113-0.03-0.0998-0.066-0.19936-0.1055-0.29527-0.08-0.19179-0.1762-0.37352-0.291-0.54556-0.1147-0.17209-0.249-0.33534-0.3945-0.48104-0.1455-0.14557-0.3038-0.27523-0.4766-0.39109-0.1729-0.11588-0.3547-0.21414-0.5449-0.29332-0.095-0.0396-0.1938-0.0753-0.293-0.10559-0.099-0.0303-0.2005-0.0558-0.3027-0.0763-0.2043-0.0409-0.4101-0.0606-0.6172-0.0606-0.207-1.4e-4 -0.418 0.02-0.6211 0.0606-0.2032 0.0405-0.3999 0.10032-0.5918 0.1799-0.096 0.0399-0.1919 0.0861-0.2832 0.13493-0.091 0.0491-0.1782 0.10135-0.2637 0.15839-0.171 0.11463-0.3316 0.24596-0.4785 0.39304-0.1468 0.14708-0.278 0.30772-0.3926 0.47907-0.1146 0.17132-0.2136 0.35606-0.2929 0.54753-0.079 0.19145-0.1388 0.38862-0.1797 0.59249-0.041 0.20385-0.062 0.41461-0.062 0.62183-1e-4 0.20724 0.02 0.41424 0.061 0.61987 0.041 0.20561 0.1007 0.40355 0.1797 0.59445 0.04 0.0954 0.084 0.1899 0.1328 0.28158 0.049 0.0918 0.1026 0.1817 0.1602 0.2679 0.1151 0.17244 0.2467 0.33089 0.3926 0.47712 0.1452 0.14616 0.3075 0.28026 0.4785 0.395 0.1711 0.11474 0.3528 0.21318 0.5449 0.29331 0.1922 0.08 0.3913 0.13914 0.5937 0.17991 0.2024 0.0405 0.4103 0.0623 0.6192 0.0626zm15 0c0.2088 1.2e-4 0.4142-0.0204 0.6172-0.0607 0.2029-0.0405 0.4047-0.10044 0.5957-0.1799 0.1911-0.0794 0.3744-0.1781 0.5468-0.29332 0.086-0.0577 0.17-0.11998 0.25-0.18576 0.08-0.0657 0.1558-0.1346 0.2286-0.20727 0.1455-0.14538 0.2766-0.30584 0.3925-0.47909 0.1158-0.17319 0.2138-0.35488 0.293-0.54556 0.079-0.19066 0.1407-0.3919 0.1816-0.59641 0.041-0.20444 0.062-0.41169 0.062-0.62183v0c0-0.21011-0.021-0.41685-0.061-0.61987-0.02-0.10149-0.045-0.20138-0.076-0.30113-0.03-0.0998-0.066-0.19936-0.1055-0.29527-0.079-0.19179-0.1762-0.37352-0.291-0.54556-0.1147-0.17209-0.2471-0.33534-0.3926-0.48104-0.1455-0.14557-0.3057-0.27523-0.4785-0.39109-0.1729-0.11588-0.3547-0.21414-0.5449-0.29332-0.095-0.0396-0.1938-0.0753-0.293-0.10559-0.099-0.0303-0.2005-0.0558-0.3027-0.0763-0.2044-0.0409-0.4101-0.0606-0.6172-0.0606-0.2071-1.4e-4 -0.418 0.02-0.6211 0.0606-0.2032 0.0405-0.3999 0.10032-0.5918 0.1799-0.096 0.0399-0.19 0.0861-0.2813 0.13493-0.091 0.0491-0.1801 0.10135-0.2656 0.15839-0.171 0.11463-0.3317 0.24596-0.4785 0.39304s-0.278 0.30772-0.3926 0.47907c-0.1146 0.17132-0.2136 0.35606-0.2929 0.54753-0.079 0.19145-0.1388 0.38862-0.1797 0.59249-0.041 0.20385-0.062 0.41461-0.062 0.62183-1e-4 0.20724 0.02 0.41424 0.061 0.61987 0.041 0.20561 0.1007 0.40355 0.1797 0.59445 0.04 0.0954 0.084 0.1899 0.1328 0.28158 0.049 0.0918 0.1026 0.1817 0.1602 0.2679 0.115 0.17244 0.2468 0.33089 0.3926 0.47712 0.1454 0.14616 0.3075 0.28026 0.4785 0.395s0.3528 0.21318 0.5449 0.29331c0.1922 0.08 0.3913 0.13914 0.5937 0.17991 0.2024 0.0405 0.4103 0.0623 0.6192 0.0626zm180.002 0c0.2089 1.2e-4 0.4163-0.0204 0.6192-0.0607 0.203-0.0405 0.4047-0.10044 0.5957-0.1799 0.1911-0.0794 0.3725-0.1781 0.5449-0.29332 0.086-0.0577 0.17-0.11998 0.25-0.18576 0.08-0.0657 0.1557-0.1346 0.2285-0.20727 0.1455-0.14538 0.2767-0.30584 0.3926-0.47909 0.1158-0.17319 0.2138-0.35488 0.293-0.54556 0.079-0.19066 0.1407-0.39192 0.1816-0.59641 0.041-0.20444 0.062-0.41169 0.062-0.62183 0-0.21011-0.023-0.41685-0.062-0.61987-0.02-0.10149-0.045-0.20138-0.076-0.30113-0.03-0.0998-0.064-0.19936-0.1035-0.29527-0.08-0.19179-0.1783-0.37352-0.293-0.54556-0.1147-0.17209-0.247-0.33534-0.3925-0.48104-0.1455-0.14557-0.3057-0.27523-0.4785-0.39109-0.1731-0.11588-0.3548-0.21414-0.545-0.29332-0.095-0.0396-0.1917-0.0753-0.291-0.10559-0.099-0.0303-0.2025-0.0558-0.3047-0.0763-0.2044-0.0409-0.4101-0.0606-0.6172-0.0606-0.2071-1.4e-4 -0.416 0.02-0.6191 0.0606-0.2032 0.0405-0.4019 0.10032-0.5938 0.1799-0.096 0.0399-0.1899 0.0861-0.2812 0.13493-0.091 0.0491-0.18 0.10135-0.2656 0.15839-0.171 0.11463-0.3317 0.24596-0.4785 0.39304s-0.2781 0.30772-0.3926 0.47907c-0.1146 0.17132-0.2137 0.35606-0.293 0.54753-0.079 0.19145-0.1388 0.38862-0.1797 0.59249-0.041 0.20385-0.062 0.41461-0.062 0.62183-1e-4 0.20724 0.02 0.41424 0.061 0.61987 0.041 0.20561 0.1026 0.40355 0.1816 0.59445 0.04 0.0954 0.082 0.1899 0.1309 0.28158 0.049 0.0918 0.1026 0.1817 0.1601 0.2679 0.1151 0.17244 0.2469 0.33089 0.3926 0.47712 0.1457 0.14616 0.3074 0.28026 0.4785 0.395 0.171 0.11474 0.3528 0.21318 0.5449 0.29331 0.1922 0.08 0.3914 0.13914 0.5938 0.17991 0.2024 0.0405 0.4103 0.0623 0.6191 0.0626zm15 0c0.2088 1.2e-4 0.4163-0.0204 0.6192-0.0607 0.203-0.0405 0.4047-0.10044 0.5957-0.1799 0.1911-0.0794 0.3726-0.1781 0.5449-0.29332 0.086-0.0577 0.1701-0.11998 0.25-0.18576 0.08-0.0657 0.1557-0.1346 0.2285-0.20727 0.1455-0.14538 0.2767-0.30584 0.3926-0.47909 0.1158-0.17319 0.2138-0.35488 0.293-0.54556 0.079-0.19066 0.1407-0.39193 0.1816-0.59641 0.041-0.20445 0.062-0.41169 0.062-0.62183 0-0.21011-0.023-0.41685-0.062-0.61987-0.02-0.10149-0.043-0.20138-0.074-0.30113-0.03-0.0998-0.066-0.19936-0.1055-0.29527-0.08-0.19179-0.1783-0.37352-0.293-0.54556-0.1148-0.17209-0.247-0.33534-0.3925-0.48104-0.1455-0.14557-0.3037-0.27523-0.4766-0.39109-0.1728-0.11588-0.3567-0.21414-0.5469-0.29332-0.095-0.0396-0.1918-0.0753-0.291-0.10559-0.099-0.0303-0.2025-0.0558-0.3047-0.0763-0.2044-0.0409-0.4101-0.0606-0.6172-0.0606-0.2071-1.4e-4 -0.4159 0.02-0.6191 0.0606-0.2031 0.0405-0.4019 0.10032-0.5938 0.1799-0.096 0.0399-0.1899 0.0861-0.2812 0.13493-0.091 0.0491-0.1801 0.10135-0.2656 0.15839-0.1711 0.11463-0.3317 0.24596-0.4785 0.39304-0.1469 0.14708-0.2781 0.30772-0.3926 0.47907-0.1146 0.17132-0.2137 0.35606-0.293 0.54753-0.079 0.19145-0.1388 0.38862-0.1797 0.59249-0.041 0.20385-0.062 0.41461-0.062 0.62183-1e-4 0.20724 0.02 0.41424 0.061 0.61987 0.041 0.20561 0.1026 0.40355 0.1816 0.59445 0.04 0.0954 0.082 0.1899 0.1309 0.28158 0.049 0.0918 0.1046 0.1817 0.1621 0.2679 0.1151 0.17244 0.2449 0.33089 0.3906 0.47712 0.1457 0.14616 0.3074 0.28026 0.4785 0.395 0.171 0.11474 0.3528 0.21318 0.5449 0.29331 0.1922 0.08 0.3914 0.13914 0.5938 0.17991 0.2024 0.0405 0.4102 0.0623 0.6191 0.0626zm-67.9472-0.91515v-2e-3h41.25v2e-3c0.1488 0 0.2971-0.016 0.4414-0.0449 0.1444-0.029 0.2856-0.0705 0.4218-0.1271 0.136-0.0567 0.267-0.12743 0.3887-0.20924 0.1216-0.0816 0.2353-0.17462 0.3399-0.27962 0.1048-0.10504 0.1983-0.22032 0.2793-0.3422 0.081-0.122 0.15-0.25258 0.207-0.38913 0.057-0.13659 0.1-0.27774 0.1289-0.42238 0.028-0.14462 0.043-0.29465 0.043-0.44192 0-0.14725-0.014-0.29242-0.043-0.43802-0.028-0.14552-0.073-0.28871-0.1289-0.42433-0.056-0.13556-0.127-0.26587-0.209-0.38912-0.082-0.12314-0.1736-0.23651-0.2773-0.34026-0.1036-0.1038-0.2196-0.19988-0.3418-0.28158s-0.2526-0.1507-0.3887-0.20727c-0.1362-0.0566-0.2779-0.10022-0.4219-0.12905-0.1439-0.0284-0.2905-0.043-0.4394-0.043h-41.25c-0.1489 0-0.2991 0.016-0.4434 0.0449-0.1444 0.029-0.2837 0.0706-0.4199 0.1271-0.136 0.0567-0.267 0.12754-0.3887 0.20924-0.1216 0.0816-0.235 0.17463-0.3398 0.27961-0.1046 0.10505-0.1983 0.22032-0.2793 0.34221-0.081 0.12201-0.153 0.25257-0.209 0.38913-0.057 0.13659-0.098 0.27774-0.127 0.42237-0.028 0.14466-0.043 0.29465-0.043 0.44193 0 0.14725 0.014 0.29243 0.043 0.43801 0.028 0.14552 0.073 0.28889 0.1289 0.42433 0.056 0.13554 0.1251 0.26588 0.2071 0.38913 0.082 0.12315 0.1758 0.23651 0.2793 0.34025 0.1036 0.10384 0.2196 0.19979 0.3418 0.28158 0.1222 0.0818 0.2506 0.15071 0.3867 0.20728 0.1362 0.0566 0.2798 0.0983 0.4238 0.1271 0.1439 0.0284 0.2906 0.0449 0.4395 0.0449z', 
//             'style':'fill:#ffffff;stroke-linecap:round;stroke-width:1;stroke:#000000'
//           },
//           {
//             'd':'m34.0191 14.5449a3.75005 3.75692 0 1 1-7.5001 0 3.75005 3.75692 0 1 1 7.5001 0z',
//             'style':'fill:none;stroke-width:1;stroke:#000000'
//           },
//           {
//             'd':'m19.0189 14.5449a3.75005 3.75692 0 1 1-7.5001 0 3.75005 3.75692 0 1 1 7.5001 0z',
//             'style':'fill:none;stroke-width:1;stroke:#000000'
//           },
//           {
//             'd':'m229.022 14.5449a3.75005 3.75692 0 1 1-7.5001 0 3.75005 3.75692 0 1 1 7.5001 0z',
//             'style':'fill:none;stroke-width:1;stroke:#000000'
//           },
//           {
//             'd':'m214.021 14.5449a3.75005 3.75692 0 1 1-7.5001 0 3.75005 3.75692 0 1 1 7.5001 0z',
//             'style':'fill:none;stroke-width:1;stroke:#000000'
//           }
//         ] 
//       }
//     ]  
//   }
// }