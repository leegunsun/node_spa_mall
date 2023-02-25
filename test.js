const myObj = {
  name: "John",
  age: 30,
  city: "New York",
};

for (const [key, value] of Object.entries(myObj)) {
  console.log(`${key}: ${value}`);
}
