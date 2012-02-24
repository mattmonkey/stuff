var Animal, Horse, Snake, awardMedals, changeNumbers, city, close2, contenders, contents, fn, foods, forecast, futurists, globals, gold, inner, log, name, open2, outer, rest, sam, silver, street, tag, temp, test, tom, weatherReport, yearsOld, _i, _ref, _ref2, _ref3, _ref4,
  __slice = Array.prototype.slice,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

gold = silver = rest = "unknown";

awardMedals = function() {
  var first, others, second;
  first = arguments[0], second = arguments[1], others = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
  gold = first;
  silver = second;
  return rest = others;
};

log = function(x) {
  return console.log(x);
};

contenders = ["Michael Phelps", "Liu Xiang", "Yao Ming", "Allyson Felix", "Shawn Johnson", "Roman Sebrle", "Guo Jingjing", "Tyson Gay", "Asafa Powell", "Usain Bolt"];

log(contenders[1]);

globals = (function() {
  var _results;
  _results = [];
  for (name in contenders) {
    _results.push(name);
  }
  return _results;
})();

weatherReport = function(location) {
  return [location, 72, "Mostly Sunny"];
};

_ref = weatherReport("Berkeley, CA"), city = _ref[0], temp = _ref[1], forecast = _ref[2];

futurists = {
  sculptor: "Umberto Boccioni",
  painter: "Vladimir Burliuk",
  poet: {
    name: "F.T. Marinetti",
    address: ["Via Roma 42R", "Bellagio, Italy 22021"]
  }
};

test = ((_ref2 = futurists.poet, name = _ref2.name, (_ref3 = _ref2.address, street = _ref3[0], city = _ref3[1])), futurists);

tag = "<impossible>";

_ref4 = tag.split(""), open2 = _ref4[0], contents = 3 <= _ref4.length ? __slice.call(_ref4, 1, _i = _ref4.length - 1) : (_i = 1, []), close2 = _ref4[_i++];

outer = 1;

changeNumbers = function() {
  var inner;
  inner = -1;
  return outer = 10;
};

inner = changeNumbers();

foods = ['broccoli', 'spinach', 'chocolate'];

yearsOld = {
  max: 10,
  ida: 9,
  tim: 11
};

fn = function(x) {
  if (x === 2) {
    log(1);
    log(2);
  }
  return "rslt";
};

log(fn(2));

Animal = (function() {

  function Animal(name) {
    this.name = name;
  }

  Animal.prototype.age = 12;

  Animal.prototype.move = function(meters) {
    return log(this.name + (" moved " + meters + "m."));
  };

  return Animal;

})();

Snake = (function(_super) {

  __extends(Snake, _super);

  function Snake() {
    Snake.__super__.constructor.apply(this, arguments);
  }

  Snake.prototype.move = function() {
    log("Slithering...");
    return Snake.__super__.move.call(this, 5);
  };

  return Snake;

})(Animal);

Horse = (function(_super) {

  __extends(Horse, _super);

  function Horse() {
    Horse.__super__.constructor.apply(this, arguments);
  }

  Horse.prototype.move = function() {
    log("Galloping...");
    return Horse.__super__.move.call(this, 45);
  };

  return Horse;

})(Animal);

sam = new Snake("Sammy the Python");

tom = new Horse("Tommy the Palomino");

sam.move();

tom.move();

/*
	1213
	12312
	213213
*/

log(sam.age);
