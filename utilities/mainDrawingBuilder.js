/**
 * This function calculates the number of pipes 
 * and outlets needed from total length (in inches) requested.
 * It returns an object with segments by size 
 * and total outlets.
 * @param {number} length 
 * @returns object
 */
 function getPipeData(length) {
    var pipes = { _96: 0, _48: 0, _32: 0, _16: 0, outlets: 0 }
    if (length % 16 === 0 && length >= 48 && length <= 1200) {
        var units = length / 16
        pipes.outlets = length / 16
        while (units > 0) {
            if (units >= 6) {
                pipes._96 += 1
                units -= 6
            } else if (units >= 3) {
                pipes._48 = 1
                units -= 3
            } else if (units >= 2) {
                pipes._32 = 1
                units -= 2
            } else if (units === 1) {
                pipes._16 = 1
                units = 0
            }
        }
        return pipes
    } else {
        pipes.error = "Length must be divisible by 16, >= to 48, and <= 1200"
        return pipes
    }
}


/**
 * This funciton takes in a set of selections from the user
 * and creates an output object with drawing specifications.
 * @param {object} options 
 */
function mainDrawing(options) {
    
}


module.exports = {  };