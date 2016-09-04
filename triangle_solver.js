// sss: 0 opp 3 sides
// {a:4, b:6, c:9}
// sas: 0 opp 2 sides 1 ang
// ssa: 1 opp 2 sides 1 ang
// asa: 0 opp 1 side 2 ang
// aas: 1 opp 1 side 2 ang

//TODO: fix naming conventions; use given_side1 vs unknown_side2


function triangleSolver() {
  // this.given_conditions = {a:4, b:6, c:9}; //sss
  this.given_conditions = {B:60, a:4, c:9}; //sas

  //TODO: define function for ordering given conditions so that angles are first

  // this function converts degrees to radians
  var convertDegsToRads = function(degree_angle) {
    var radian_angle = degree_angle*(Math.PI)/180;
    return radian_angle;
  }

  // this function converts radians to degrees
  var convertRadsToDegs = function(radian_angle) {
    var degree_angle = radian_angle/(Math.PI)*180;
    return degree_angle;
  }

  var findThirdAngle = function(angle1,angle2) {
    var angle = 180 - angle1 - angle2;
    return angle;
  }

  // this function solves for the angle opposite of side1
  var lawOfCosinesAngle = function(side1,side2,side3) {
    // this angle is opposite of the first side, a
    var angle = Math.acos((side2**2 + side3**2 - side1**2) / (2*side2*side3));
    angle = convertRadsToDegs(angle); // convert from radians to degrees
    return angle;
  }

  // this function solves for the side opposite of the given angle
  var lawOfCosinesSide = function(angle,side1,side2) {
    var side = (side1**2 + side2**2 - 2*side1*side2*(Math.cos(angle)))**(0.5);
    return side;
  }

  // this function solves for the angle opposite of side2, given that angle1 is opposite of side1
  var lawOfSinesAngle = function(angle1,side1,side2) {
    var angle = Math.asin(side2*(Math.sin(angle1)/side1))
    angle = convertRadsToDegs(angle); // convert from radians to degrees
    return angle;
  }

  // this function is used to find three angles when the given conditions are only sides
  this.sss = function() {
    var a = this.given_conditions.a;
    var b = this.given_conditions.b;
    var c = this.given_conditions.c;

    var first_angle = lawOfCosinesAngle(a,b,c);
    var second_angle = lawOfCosinesAngle(b,a,c);
    var third_angle = lawOfCosinesAngle(c,a,b);

    //TODO: return object of all sides and associated angles?
    // var solution = {}
    // return third_angle;
  }

  this.sas = function () {
    // this.given_conditions = {B:60, a:4, c:9};

    var angle = convertDegsToRads(this.given_conditions.B);
    var b = this.given_conditions.a;
    var c = this.given_conditions.c;

    var side_opposite_angle = lawOfCosinesSide(angle,b,c);
    var angle_opposite_b = lawOfSinesAngle(angle,side_opposite_angle,b);
    var angle_opposite_c = lawOfCosinesAngle(c,side_opposite_angle,b);

    return angle_opposite_c;
  }

}

t = new triangleSolver();
t.sas();
