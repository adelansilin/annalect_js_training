// Parent class
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() {
    console.log(`${this.name} barks.`);
  }

  eat() {
    console.log(`${this.name} is eating.`);
  }
}

const myDog = new Dog("Rex", "German Shepherd");
myDog.speak();
myDog.eat();
