// const passwordRegex = /^[A-Za-z0-9]{3,}$/;
const nicknameRegex = /^[A-Za-z0-9]{3,}$/;

console.log(nicknameRegex.test("abc123")); //true
console.log(nicknameRegex.test("ABC")); //false
console.log(nicknameRegex.test("abc!")); //false
console.log(nicknameRegex.test("abc123_")); //false
