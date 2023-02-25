const person = { firstName: "John", lastName: "Doe", age: 30, gender: "male" };

// Destructure the person object and collect the remaining properties into an object
const { firstName, lastName, ...other } = person;

console.log(firstName); // Output: 'John'
console.log(lastName); // Output: 'Doe'
console.log(other); // Output: { age: 30, gender: 'male' }
