gold = silver = rest = "unknown"

awardMedals = (first, second, others...) ->
  gold   = first
  silver = second
  rest   = others

log = (x) -> console.log x

contenders = [
  "Michael Phelps"
  "Liu Xiang"
  "Yao Ming"
  "Allyson Felix"
  "Shawn Johnson"
  "Roman Sebrle"
  "Guo Jingjing"
  "Tyson Gay"
  "Asafa Powell"
  "Usain Bolt"
]

#alert rest
#alert 12

log  contenders[1]

globals = (name for name of contenders)

weatherReport = (location) ->
  # Make an Ajax request to fetch the weather...
  [location, 72, "Mostly Sunny"]

[city, temp, forecast] = weatherReport "Berkeley, CA"

futurists =
  sculptor: "Umberto Boccioni"
  painter:  "Vladimir Burliuk"
  poet:
    name:   "F.T. Marinetti"
    address: [
      "Via Roma 42R"
      "Bellagio, Italy 22021"
    ]

test = {poet: {name, address: [street, city]}} = futurists

tag = "<impossible>"

[open2, contents..., close2] = tag.split("")

#log  contents.length
#`log(2)`

outer = 1
changeNumbers = ->
  inner = -1
  outer = 10
inner = changeNumbers()

#log inner
#log outer

#log "#{numb} - #{c}" for c ,numb in contenders
#foods = ['broccoli', 'spinach', 'chocolate']
#eat food for food in foods when food isnt 'chocolate'
#yearsOld = max: 10, ida: 9, tim: 11

#ages = for child, age of yearsOld
  #"#{child} is #{age}"

foods = ['broccoli', 'spinach', 'chocolate']
#log food for food in foods when food isnt 'chocolate'

#log ages

yearsOld = max: 10, ida: 9, tim: 11

#log age for child, age of yearsOld

fn = (x)->
	if x is 2
		log 1
		log 2
	"rslt"

log fn 2

class Animal
  constructor: (@name) ->

  age:  12

  move: (meters) ->
    log @name + " moved #{meters}m."


class Snake extends Animal
  move: ->
    log "Slithering..."
    super 5

class Horse extends Animal
  move: ->
    log "Galloping..."
    super 45

sam = new Snake "Sammy the Python"
tom = new Horse "Tommy the Palomino"

sam.move()
tom.move()

###
	1213
	12312
	213213
###
log sam.age
