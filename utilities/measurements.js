
/**
 * This function converts inches to feet and inches,
 * example: 18 inches to 12'6"
 * @param {int} inches 
 * @returns 
 */
function convertInches(inches){
    let feetFromInches = Math.floor(inches / 12);
    let inchesRemainder = inches % 12;
 
    let result = feetFromInches + "' " + inchesRemainder + "\"";
    return result
}

module.exports = { convertInches };