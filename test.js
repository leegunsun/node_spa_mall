// const passwordRegex = /^[A-Za-z0-9]{3,}$/;

// const nicknameRegex = /^[A-Za-z0-9]{3,}$/;
// const passwordRegex = new RegExp(`^[A-Za-z0-9]{4,}$`);
// const passwordRegex2 = new RegExp(`^(?!.*${nickname})`);
const nickname = "abc1";
const nicknameRegex = /^[A-Za-z0-9]{3,}$/;
const passwordRegexLength = new RegExp(`^[A-Za-z0-9]{4,}$`);
const passwordRegex = new RegExp(`^(?!.*${nickname}).+$`);
// const passwordRegex = new RegExp(`^(?!.*${nickname})`);

console.log(passwordRegex.test("abc123")); //true
console.log(passwordRegex.test("ABC")); //false
console.log(passwordRegex.test("abc!")); //false
console.log(passwordRegex.test("abc123_")); //false
console.log(passwordRegex.test("abc123sass")); //false

// console.log(passwordRegex2.test("abc123")); //true
// console.log(passwordRegex2.test("ABC")); //false
// console.log(passwordRegex2.test("abc!")); //false
// console.log(passwordRegex2.test("abc123_")); //false
