// sss: 0 opp 3 sides
// sas: 0 opp 2 sides 1 ang
// asa: 0 opp 1 side 2 ang
// non-possible triangles based on side lengths

// ssa: 1 opp 2 sides 1 ang
// aas: 1 opp 1 side 2 ang

function triangleSolver() {
  this.given_conditions = {a:4, b:6, c:9}; //sss
  // this.given_conditions = {a:4, b:60, c:9}; //sas
  // this.given_conditions = {a:50,b:3,c:20}; //asa
  // this.given_conditions = {a:2,b:4,c:1}; //sss-not possible


  // converts degrees to radians
  var convertDegsToRads = function(degree_angle) {
    var radian_angle = degree_angle*(Math.PI)/180;
    return radian_angle;
  };

  // converts radians to degrees
  var convertRadsToDegs = function(radian_angle) {
    var degree_angle = radian_angle/(Math.PI)*180;
    return degree_angle;
  };

  // finds third angle given two angles, must be in degrees
  var findThirdAngle = function(angle1,angle2) {
    var angle = 180 - angle1 - angle2;
    return angle;
  }

  // finds the angle opposite of first_side, angles are in rads
  var lawOfCosinesAngle = function(first_side,second_side,third_side) {
    var angle = Math.acos((second_side**2 + third_side**2 - first_side**2) / (2*second_side*third_side));
    angle = convertRadsToDegs(angle); // convert from radians to degrees
    return angle;
  };

  // finds the (third) side opposite of the given angle, angles are in rads
  var lawOfCosinesSide = function(angle,first_side,second_side) {
    var side = (first_side**2 + second_side**2 - 2*first_side*second_side*(Math.cos(angle)))**(0.5);
    return side;
  };

  // finds the angle opposite of second_side, given that first_angle is opposite of first_side, angles are in rads
  var lawOfSinesAngle = function(first_angle,first_side,second_side) {
    var angle = Math.asin(second_side*(Math.sin(first_angle)/first_side));
    angle = convertRadsToDegs(angle); // convert from radians to degrees
    return angle;
  };

  // finds the side opposite of second_angle, given that first_angle is opposite of first_side, angles are in rads
  var lawOfSinesSide = function(first_angle,first_side,second_angle) {
    var side = Math.sin(second_angle)*first_side/Math.sin(first_angle);
    return side;
  };

  // determines if a triangle is possible to construct given three sides using Triangle Inequality Theorem
  // this.given_conditions = {a:2,b:4,c:1}; // sss-not possible
  this.tit = function() {
    var side1 = this.given_conditions.a;
    var side2 = this.given_conditions.b;
    var side3 = this.given_conditions.c;

    if (side1 + side2 > side3 && side1 + side3 > side2 && side3 + side2 > side1) {
      return this.sss();
    } else {
      return "This is not a constructible triangle."
    };
  };


  // finds three angles when the given conditions are only sides
  // this.given_conditions = {a:4, b:6, c:9}; //sss
  this.sss = function() {
    var side1 = this.given_conditions.a;
    var side2 = this.given_conditions.b;
    var side3 = this.given_conditions.c;
    var solutions = {};

    solutions.angle1 = lawOfCosinesAngle(side1,side2,side3);
    solutions.angle2 = lawOfCosinesAngle(side2,side1,side3);
    solutions.angle3 = lawOfCosinesAngle(side3,side1,side2);

    return solutions;
  };

  // finds two angles opposite of the given sides and the side opposite of the given angle
  // this.given_conditions = {a:4, b:60, c:9};
  this.sas = function () {

    var side1 = this.given_conditions.a;
    var angle3 = convertDegsToRads(this.given_conditions.b);
    var side2 = this.given_conditions.c;
    var solutions = {};

    solutions.side3 = lawOfCosinesSide(angle3,side1,side2);
    solutions.angle1 = lawOfSinesAngle(angle3,solutions.side3,side1);
    solutions.angle2 = lawOfCosinesAngle(side2,solutions.side3,side1);

    return solutions;
  };

  // finds two sides opposite of the given angles and the angle opposite of the given side
  // this.given_conditions = {a:50,b:3,c:20}
  this.asa = function(){

    var angle1 = this.given_conditions.a;
    var side2 = this.given_conditions.b;
    var angle3 = this.given_conditions.c;
    var solutions = {};

    solutions.angle2 = findThirdAngle(angle1,angle3);
    solutions.side1 = lawOfSinesSide(convertDegsToRads(solutions.angle2),side2,convertDegsToRads(angle1));
    solutions.side3 = lawOfSinesSide(convertDegsToRads(solutions.angle2),side2,convertDegsToRads(angle3));

    return solutions;
  };


}

t = new triangleSolver();
t.tit();
