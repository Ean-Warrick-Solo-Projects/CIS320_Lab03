let Person = {name : "No Name", age : -1}

let handler = {
    get : function(target, property, receiver) {
        if (target[property]) {
            return target[property]
        }else {
            return Person[property]
        }
    }
}

Person.new = function(name, age) {
    let self = {}
    self.name = name
    self.age = age

    return new Proxy(self, handler)
}

Person.shout = function(person) {
    console.log(person.name + ": AHHHHH I'M " + person.age)
}

let newPerson = Person.new("William", 19)
console.log(newPerson.age)
console.log(newPerson.name)
newPerson.shout(newPerson)
