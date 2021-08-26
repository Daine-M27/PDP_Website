
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

/**
 * This function takes in a pipe length and returns
 * a scale multiple for svg
 */
function findScale(length){
  const scaleMultiple = .0128472222  
  const scale = 1 - scaleMultiple * (length/16 - 3)
  
  return scale
}


/**
 * This function takes in a pipe length and returns
 * a stroke size for svg
 */
 function findStroke(length){
  const scaleMultiple = .0125
  const stroke = 1 + scaleMultiple * (length/16 - 3)
  
  return stroke
}
module.exports = { convertInches };