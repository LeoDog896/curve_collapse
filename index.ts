type Func = (x: number) => number;

// generate a new seeded random number generator
const newRandom = (seed = 1) => {
  return () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
};

// Input the equation you wish to extrapolate points from
// This takes in X and returns Y
const equation: Func = (x) => Math.pow(x, 2);

const appendItem = (arr: unknown[], item: unknown) => arr.push(item);

//derivative and integral functions

//deriv - Gets the derivative of an equation at the specified coordinate, estiamted.
//
//INPUTS
//   x         - (Number) x value of the function you wish to get the derivative of.
//   degree    - (Number) The number of decimals you wish to round to.
//                        Must be a positive whole number.
//
//   EFFICIENCY CALCULATIONS - Leave blank if unnecessary
//
//   roundBoolean (Rounding-point reduction for efficiency calculation)
//   rB_input  - (Boolean) If true, rounds input.
//                         Reduces computation time, but increases potential error.
//   rB_output - (Boolean) If true, rounds output.
//                         Reduces computation time, but increases potential error.
//
//RETURNS: (Number) The value of the derivative at x
//
function deriv(x, degree, rB_input, rB_output) {
  //Makes sure degree is a whole number
  degree = Math.round(degree);
  //Sets the change in X, deltaX, to an inverse 10 power.
  let delta = Math.pow(10, -1 * degree);
  //Alters x if rB_output is true
  x += trueNum(rB_input) * (Math.round(x / delta) * delta - x);
  //Inputs x and deltaX into the derivative equation
  let result = (equation(x + delta) - equation(x - delta)) / (2 * delta);
  //Alters result if rB_output is true
  result += trueNum(rB_output) * (Math.round(result / delta) * delta - result);
  //Returns the final value
  return result;
}

//integ - Gets the integral of an equation between the specified coordinates, estimated.
//
//INPUTS
//   a         - (Number) x value of the lower endpoint of the integral.
//   b         - (Number) x value of the upper endpoint of the integral.
//   degree    - (Number) The amount of subdivisions taken, as a positive power of 10.
//                        Must be a positive whole number.
//
//   EFFICIENCY CALCULATIONS - Leave blank if unnecessary
//
//   roundBoolean (Rounding-point reduction for efficiency calculation)
//   rB_input  - (Boolean) If true, rounds input.
//                         Reduces computation time, but increases potential error.
//   rB_output - (Boolean) If true, rounds output.
//                         Reduces computation time, but increases potential error.
//
//RETURNS: (Number) The area under the curve from x=a to x=b
//
function integ(a, b, degree, rB_input, rB_output) {
  //Makes sure degree is a whole number
  degree = Math.round(degree);
  //Sets the number of subdivisions to be taken as delta
  let delta = Math.pow(10, degree);
  //Alters a and b if rB_input is true
  a += trueNum(rB_input) * (Math.round(a * delta) / delta - a);
  b += trueNum(rB_input) * (Math.round(b * delta) / delta - b);
  //Starts the sum as 0, and the length/range from a to b along x
  let result = 0;
  let range = b - a;
  //Repeat for delta times
  for (let i = 0; i < delta; i++) {
    //Trapezoid equation A = ( (b1 + b2)/2 ) * h

    //Base 1 and base 2 taken as the y val
    let bound1 = a + range * (i / delta);
    let bound2 = a + range * ((i + 1) / delta);
    result += ((equation(bound1) + equation(bound2)) / 2) * (range / delta);
  }
  //Rounds result if rB_output is true
  result += trueNum(rB_output) * (Math.round(result * delta) / delta - result);
  //Returns the final value
  return result;
}

/** transfers boolean operators into numbers
 *
 * @param boolean - the boolean value to convert
 * @returns 1 if true, 0 if false
 */
function trueNum(boolean: boolean) {
  return boolean ? 1 : 0;
}

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

//pointExtrapolate and internal functions

//curveLength - Gets the length of a curve, estimate based off of integral function
//
//   a           - (Number) x value of the lower endpoint of the integral.
//   b           - (Number) x value of the upper endpoint of the integral.
//   degree      - (Number) The amount of subdivisions taken, as a positive power of 10.
//                          Must be a positive whole number.
//
//   EFFICIENCY CALCULATIONS - Leave blank if unnecessary
//
//   roundBoolean (Rounding-point reduction for efficiency calculation)
//   rB_input    - (Boolean) If true, rounds input.
//                           Uses degree, unless overridden by sD_enable;sD_integDeg.
//                           Reduces computation time, but increases potential error.
//   rB_internal - (Boolean) If true, rounds the base values used in integral estimation.
//                           Rounding uses 'degree' for derivative result rounding.
//                           Significantly reduces computation time,
//                           but increases potential error.
//   rB_output   - (Boolean) If true, rounds output.
//                           Reduces computation time, but increases potential error.
//
//   specificDegree (Multivariate degree alteration for accuracy calculation)
//   sD_enable   - (Boolean) If true, overrides 'degree' for sD variables.
//                           All sD values must be filled for proper functionality
//                           if this is the case, otherwise all default to 1.
//   sD_inputDeg - (Number) Sets the decimals with which to round the input to.
//                          ONLY APPLIES if rB_input is enabled.
//                          Minimal calculation.
//   sD_integDeg - (Number) Sets the amount of subdivisions taken in integral
//                          calculation, determined by 10^input.
//                          Intensive calculation.
//   sD_derivDeg - (Number) Sets the decimal the degree is rounded to in
//                          derivative calculation, determined by 10^-input.
//                          Minimal calculation.
//
//RETURNS: (Number) The length of the curve from x=a to x=b
//
function curveLength(
  a,
  b,
  degree,
  rB_input,
  rB_internal,
  rB_output,
  sD_enable,
  sD_inputDeg,
  sD_integDeg,
  sD_derivDeg,
) {
  //Note: the code in here is a bit less organized than in pointExtrapolate(), sorry!
  // -B

  //PRECHECK
  //In the case sD_enable is false,
  //sD_integDeg and sD_derivDeg don't exist, so replace with 1s
  if (
    sD_inputDeg == undefined || sD_integDeg == undefined ||
    sD_derivDeg == undefined
  ) {
    sD_inputDeg = 1;
    sD_integDeg = 1;
    sD_derivDeg = 1;
  }

  //Makes sure degree is a whole number
  //If sD_enable is true, overrides with sD_integDeg
  degree = trueNum(!sD_enable) * Math.round(degree) +
    trueNum(sD_enable) * Math.round(sD_integDeg);
  //If sD_enable is true, uses sD_derivDeg for curveLengthAt()
  //Else, uses degree
  let derivDeg = trueNum(!sD_enable) * degree +
    trueNum(sD_enable) * Math.round(sD_derivDeg);
  //Sets the number of subdivisions to be taken as delta
  let delta = Math.pow(10, degree);
  //Alters a and b if rB_input is true
  //If sD_enable is also true, uses sD_inputDeg
  //Else uses delta
  let roundDec = trueNum(!sD_enable) * delta +
    trueNum(sD_enable) * Math.pow(10, Math.round(sD_inputDeg));
  a += trueNum(rB_input) * (Math.round(a * roundDec) / roundDec - a);
  b += trueNum(rB_input) * (Math.round(b * roundDec) / roundDec - b);
  //Starts the sum as 0, and the length/range from a to b along x
  let result = 0;
  let range = b - a;
  //Repeat for delta times
  for (let i = 0; i < delta; i++) {
    //Trapezoid equation A = ( (b1 + b2)/2 ) * h

    //Base 1 and base 2 taken as the y val
    let bound1 = a + range * (i / delta);
    let bound2 = a + range * ((i + 1) / delta);
    //rB_internal rounds output of curveLengthAt() when true
    //derivDeg is used for degree in case sD_enable is true
    result += ((curveLengthAt(bound1, derivDeg, rB_internal) +
      curveLengthAt(bound2, derivDeg, rB_internal)) / 2) * (range / delta);
  }
  //Rounds result if rB_output is true
  result += trueNum(rB_output) * (Math.round(result * delta) / delta - result);
  //Returns the final value
  return result;
}
//curveLengthAt - conjuction function to curveLength
//REMAIN THE SAME! EDITING WILL MESS WITH PROGRAM!
function curveLengthAt(x, degree, roundBoolean) {
  return Math.sqrt(1 + Math.pow(deriv(x, degree, false, roundBoolean), 2));
}

//pointExtrapolate - Gets the coordinates of equidistant points along a curve between 2 x-values
//
//   a           - (Number) x value of the lower endpoint you wish to extrapolate.
//   b           - (Number) x value of the upper endpoint you wish to extrapolate.
//   n           - (Number) The total number of points returned,
//                          including the endpoints where x=a and x=b.
//   degree      - (Number) An arbitrary number which estimates to what amount error
//                          may be present in computation.
//                          Larger numbers mean lower error, but more computation time.
//                          Recommended value of '3' for lower end machines,
//                          '5' for higher end machines.
//                          Must be a positive whole number.
//
//   EFFICIENCY CALCULATIONS - Leave blank if unnecessary
//
//   ////
//   NOTE: THE NUMBER OF COMPUTATIONS MAKES IT OPTIMAL TO USE EFFICIENCY.
//   ////
//
//   roundBoolean (Rounding-point reduction for efficiency calculation)
//   rB_input    - (Boolean) If true, rounds input.
//                           Uses 'degree', unless overriden by sD_enable;;sD_inputDeg.
//                           Reduces computation time, but increases potential error.
//   rB_internal - (Boolean) If true, rounds the base values used in integral estimation.
//                           Rounding uses 'degree' for derivative result rounding,
//                           unless overridden by sD_enable;;sD_derivDeg.
//                           Significantly reduces computation time,
//                           but increases potential error.
//   rB_integRes - (Boolean) If true, rounds the results of integral calculations.
//                           Rounding uses 'degree' for integral result rounding,
//                           unless overridden by sD_enable;;sD_integDeg.
//                           Reduces computation time, but increases potential error.
//                           WARNING: When using sD_roundDeg, if rounding-point of
//                           sD_roundDeg is greater, calculations will be invalidated.
//                           Check if 2^sD_roundDeg>10^sD_integDeg.
//   rB_randomCh - (Boolean) If true, rounds random selected value.
//                           Rounds using 'degree', unless overridden by
//                           sD_enable;;sD_input.
//
//   specificDegree (Multivariate degree alteration for accuracy calculation)
//   sD_enable   - (Boolean) If true, overrides 'degree' for sD variables.
//                           All sD values must be filled for proper functionality
//                           if this is the case, otherwise all default to 1.
//   sD_inputDeg - (Number) Sets the degree of rounding of the input.
//                          Only valid if rB_input is true.
//                          Minimal calculation.
//   sD_integDeg - (Number) Sets the amount of subdivisions taken in integral
//                          calculation of all curveLength() integrand functions,
//                          determined by 10^input.
//                          Intensive calculation.
//   sD_derivDeg - (Number) Sets the decimal the degree is rounded to in
//                          derivative calculation, determined by 10^-input.
//                          Minimal calculation.
//   sD_roundDeg - (Number) Sets the amount of iterations to round when estimating
//                          upper bound. Precision based on 2^-n.
//                          Intensive calculation.
//
export function pointExtrapolate(
  a: number,
  b: number,
  n: number,
  degree: number,
  rB_input = false,
  rB_internal = false,
  rB_integRes = false,
  rB_randomCh = false,
  sD_enable = false,
  sD_inputDeg = 1,
  sD_integDeg = 1,
  sD_derivDeg = 1,
  sD_roundDeg = 1,
) {
  //PRECHECK - Must set all rounded variables wherever possible.
  //Makes sure n is a whole number
  n = Math.round(n);
  //Sets the degrees and makes sure they're whole numbers
  //If sD_enable is true, overrides with associated sD_values
  //Else, replace with degree for all
  //Input degree
  sD_inputDeg = trueNum(!sD_enable) * Math.round(degree) +
    trueNum(sD_enable) * Math.round(sD_inputDeg);
  //Integral degree
  sD_integDeg = trueNum(!sD_enable) * Math.round(degree) +
    trueNum(sD_enable) * Math.round(sD_integDeg);
  //Derivative degree
  sD_derivDeg = trueNum(!sD_enable) * Math.round(degree) +
    trueNum(sD_enable) * Math.round(sD_derivDeg);
  //Rounding degree
  sD_roundDeg = trueNum(!sD_enable) * Math.round(degree) +
    trueNum(sD_enable) * Math.round(sD_roundDeg);
  //Rounds a and b if rB_input is true
  //sD_inputDeg supercedes degree when sD_enable is true, else ==
  //Sets roundDec to use for rounding calculation
  let roundDec = Math.pow(10, sD_inputDeg);
  a += trueNum(rB_input) * (Math.round(a * roundDec) / roundDec - a);
  b += trueNum(rB_input) * (Math.round(b * roundDec) / roundDec - b);

  //STEP 1 - Find total and partial curve lengths
  //get length of total function curve from x=a to x=b
  let lengthTotal = curveLength(
    a,
    b,
    sD_integDeg,
    false,
    rB_internal,
    rB_integRes,
    sD_enable,
    sD_inputDeg,
    sD_derivDeg,
    sD_integDeg,
  );
  //divide into n-1 sections to be placed making n points
  //as n points can make n-1 line segments
  let lengthSection = lengthTotal / (n - 1);

  //STEP 2 - Approximate values of each point's x value using repeated estimation
  //List used for storing x values
  let listX: number[] = [];
  //Appends the first value x=a as x1
  listX = [...listX, a];
  //Repeat for n-2 sections (as last section has x=b as endpoint and isn't necessary to be solved)
  const random = newRandom();
  for (let i = 0; i < n - 2; i++) {
    //PART A
    //Chooses a random x-value between x(i+1) (highest known x value) and x=b (endpoint)
    //First creates the additive random value with range 0 to b-known
    let randomAssign = random() * (b - listX[i]);
    //Rounds randomAssign if rB_randomCh is true using sD_inputDeg or degree
    randomAssign += trueNum(rB_randomCh) *
      (Math.round(randomAssign * sD_inputDeg) / sD_inputDeg - randomAssign);
    let randomChoose = listX[i] + randomAssign;
    //Gets the result of the curve length from listX[i], or x(i+1) to randomChoose
    let randomChooseResult = curveLength(
      listX[i],
      randomChoose,
      sD_integDeg,
      false,
      rB_internal,
      rB_integRes,
      sD_enable,
      sD_inputDeg,
      sD_derivDeg,
      sD_integDeg,
    );

    //PART B
    //A test score is taken by determining if randomChooseResult is greater
    //or less than lengthSection. Starts by evaluating a boolean, returning
    //1 if true and 0 if false, then adjusts so it's 1 if true and -1 if false.
    //Meaning 1 is randomChooseResult is too long, and
    //2 is too short when compared to lengthSection.
    let testScore = 2 * ((trueNum(randomChooseResult > lengthSection)) - 0.5);
    //comparison to check the test score with itself, used in later code
    let testScoreCheck = testScore;

    //PART C
    //A 'while' loop takes our value of randomChoose and keeps adding 1 or -1 to it
    //until a repeated re-check of testScoreCheck shows that the direction has changed
    //(meaning randomChoose now results in a larger/smaller-than-lengthSection that
    //doesn't match the previous check).
    //if randomChoose is too small, add 1 until it's too big.
    //if randomChoose is too big, subtract 1, subtract 1 until it's too small.
    while (testScoreCheck == testScore) {
      //Alters randomChoose by the negative of testScore,
      //inherently adding if below, subtracting if above.
      randomChoose -= testScore;
      //Sets result to the specific integral function for length
      //of the new randomChoose x upper bound.
      randomChooseResult = curveLength(
        listX[i],
        randomChoose,
        sD_integDeg,
        false,
        rB_internal,
        rB_integRes,
        sD_enable,
        sD_inputDeg,
        sD_derivDeg,
        sD_integDeg,
      );
      //Resets testScore if necesary, elsewise returns the same value;
      //The while loop ends once this value changes.
      testScore = 2 * ((trueNum(randomChooseResult > lengthSection)) - 0.5);
    }

    //PART D
    //The for loop will approximate the value of the real X a number of times before
    //returning whatever value it got to as progress. It uses a process of comparing
    //the altered random choice result to the intended length, then adjusting the
    //upper bound by a fraction determined by 2^-n (since as n approaches positive
    //infinity, the sum of all results of 2^-n will equal 1, and can be arranged by
    //a variety of positives and negatives to get any value between 0 and 1). This
    //will allow us to get closer and closer to rounding, however this part of the
    //function also takes the MOST COMPUTATION power, so closer rounds are a harder
    //task to manage.
    //Begin with a score closeRep to  model the number of times the loop will occur.
    //The value is equal to a whole-number rounded variant of log(2)*degree, or if
    //sD_enable is true, the default value of sD_roundDeg.
    let closeRep = Math.round(
      Math.pow(3.321918095, trueNum(!sD_enable)) * sD_roundDeg,
    );
    //The for loop occurs to continue to round closer to the real upper bound
    //wanted. Each repeat changes the value by less and less each time.
    for (let j = 0; j < closeRep; j++) {
      //Sets randomChooseResult to curve length from listX[i] to randomChoose
      randomChooseResult = curveLength(
        listX[i],
        randomChoose,
        sD_integDeg,
        false,
        rB_internal,
        rB_integRes,
        sD_enable,
        sD_inputDeg,
        sD_derivDeg,
        sD_integDeg,
      );
      //Sets the test score to be 1 if greater than, -1 if less than
      testScore = 2 * ((trueNum(randomChooseResult > lengthSection)) - 0.5);
      //Alters randomChoose by adding or subtracting a negative power of 2 based on testScore
      randomChoose -= testScore * (1 / Math.pow(2, j));
    }
    //After rounding repetition has happened, append the final randomChoose value
    //to the list, as it's a close approximation to the true upper bound of that
    //curve section, estimated.
    appendItem(listX, randomChoose);
  }
  //The process above will repeat for the rest of the necessary midpoints.

  //This then appends the final value to list, being x=b.
  appendItem(listX, b);

  //STEP 3 - Get y-values at gathered X-coordinates
  //Use the list listY for y-values at each associated X-value
  const listY: number[] = [];
  //For loop for each x-value
  for (let k = 0; k < listX.length; k++) {
    appendItem(listY, equation(listX[k]));
  }

  //STEP 3.5 - If rB_xyValue is true, round the x and y values
  for (let v = 0; v < listX.length; v++) {
    listX[v] += trueNum(rB_input) *
      (Math.round(listX[v] * roundDec) / roundDec - listX[v]);
    listY[v] += trueNum(rB_input) *
      (Math.round(listY[v] * roundDec) / roundDec - listY[v]);
  }

  //STEP 4 - Compile the coordinates and return
  //
  //NOTE: Since this is in an app-oriented javaScript, the output
  //will be noted as a string.
  //
  //CHANGE THIS CODE FOR IT TO BE FUNCTIONAL ELSEWHERE.
  //

  // instead, return the coordinates as an array of arrays (points)
  return listX.map((x, i) => [x, listY[i]]);
}
