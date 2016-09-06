// sss: 0 opp 3 sides
// {a:4, b:6, c:9}
// sas: 0 opp 2 sides 1 ang
// ssa: 1 opp 2 sides 1 ang
// asa: 0 opp 1 side 2 ang
// aas: 1 opp 1 side 2 ang

// TODO: fix naming conventions; use given_side1 vs unknown_side2


function triangleSolver() {
  // this.given_conditions = {a:4, b:6, c:9}; //sss
  this.given_conditions = {a:4, b:60, c:9}; //sas

  //TODO: define function for ordering given conditions so that angles are first

  // this function converts degrees to radians
  var convertDegsToRads = function(degree_angle) {
    var radian_angle = degree_angle*(Math.PI)/180;
    return radian_angle;
  };

  // this function converts radians to degrees
  var convertRadsToDegs = function(radian_angle) {
    var degree_angle = radian_angle/(Math.PI)*180;
    return degree_angle;
  };

  // var findThirdAngle = function(angle1,angle2) {
  //   var angle = 180 - angle1 - angle2;
  //   return angle;
  // }

  // this function solves for the angle opposite of first_side
  var lawOfCosinesAngle = function(first_side,second_side,third_side) {
    // this angle is opposite of the first_side
    var angle = Math.acos((second_side**2 + third_side**2 - first_side**2) / (2*second_side*third_side));
    angle = convertRadsToDegs(angle); // convert from radians to degrees
    return angle;
  };

  // this function solves for the (third) side opposite of the given angle
  var lawOfCosinesSide = function(angle,first_side,second_side) {
    var side = (first_side**2 + second_side**2 - 2*first_side*second_side*(Math.cos(angle)))**(0.5);
    return side;
  };

  // this function solves for the angle opposite of second_side, given that first_angle is opposite of first_side
  var lawOfSinesAngle = function(first_angle,first_side,second_side) {
    var angle = Math.asin(second_side*(Math.sin(first_angle)/first_side))
    angle = convertRadsToDegs(angle); // convert from radians to degrees
    return angle;
  };

  // this function is used to find three angles when the given conditions are only sides
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

  this.sas = function () {
    // this.given_conditions = {a:4, b:60, c:9};

    var side1 = this.given_conditions.a;
    var angle3 = convertDegsToRads(this.given_conditions.b);
    var side2 = this.given_conditions.c;
    var solutions = {};

    solutions.side3 = lawOfCosinesSide(angle3,side1,side2);
    solutions.angle1 = lawOfSinesAngle(angle3,solutions.side3,side1);
    solutions.angle2 = lawOfCosinesAngle(side2,solutions.side3,side1);

    return solutions;
  };

}

t = new triangleSolver();
t.sss();
