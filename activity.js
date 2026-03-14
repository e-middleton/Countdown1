/* Beginner Challenge */

const bookList = [
  { title: "Don Quixote", author: "Miguel de Cervantes" },
  { title: "Ulysses", author: "James Joyce" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { title: "Moby Dick", author: "Herman Melville" },
];

/* Do all of these using proper ES6 syntax
Using the following array of objects,
*/

// (1) Write an arrow function that adds a new entry to bookList
const addBook = (newTitle, newAuthor) => {
  bookList.push( {title: newTitle, author: newAuthor} );
  return bookList;
};

// (2) Write an arrow function that removes a specific book from the bookList
const removeBook = (removeTitle, removeAuthor) => {
  return bookList.filter(
    (book) => !(book.title === removeTitle && book.author === removeAuthor)
  );
};

// (3) Write an arrow function that prints all book titles using .forEach()
const printBooks = () => {
  bookList.forEach((item) => console.log(item));
};

// testing

const addedList = addBook("Les Miserables", "Victor Hugo")
const newList = removeBook("Ulysses", "James Joyce")
console.log(addedList);
console.log(newList);
printBooks()


/* Intermediate Challenge */

// (4) Write a one-line arrow function that takes in a number and returns
// whether the number is positive or negative using a ternary operator
const numberSign = (n) => {return n >=0 ? "positive" : "negative"};//  remove null type and add your code here

// testing 

let n = -1
let m = 1
console.log(numberSign(n));
console.log(numberSign(m));

/* (5) Write a switch statement for a 'day' variable that prints something
based off of what day of the week it is */

let day = "Monday";

switch(day){
  case "Monday":
    console.log("A terrible day")
    break;
  default:
    console.log("A lovely day")
    break;
}


/* (6) Write an arrow function that takes in a number and returns the sum
of every number from 1 up to that number */

const sumUp = (n) => {
  let sum = 0;
  for (let i = 1; i <= n ; i++) {
    sum = sum + i;
  }
  return sum;
};

console.log(sumUp(3));


/* Harder Challenge */

// (7) Convert Celsius to Fahrenheit and return clothing advice

const temperature = (celsius) => {
  // your code here
  const fahrenheit = (celsius*(9/5)) + 32;

  if (fahrenheit < 0) {
    console.log("sweater");
  } else if (fahrenheit > 80) {
    console.log("tank top");
  } else {
    console.log("t-shirt");
  }
};

temperature(0);


/* (8) Print the amount of truthy values in an array using .forEach() */
let array = ["", ""];

const truthy = (arr) => {
  let num = 0;
  arr.forEach((value) => value ? num = num+1 : num = num+0);
  return num;
};

console.log("Truthy in arr: ");
console.log(truthy(array));


/* (9) Using map(), return an array of objects that contain:
   - fullName
   - averageGrade */

const attendance = [
  { firstName: "Clay", lastName: "Tondreau", gpa: 4.0 },
  { firstName: "Tucker", lastName: "Wilson", gpa: 2.0 },
  { firstName: "Eliza", lastName: "Tobin", gpa: 3.7 },
  { firstName: "Sofia", lastName: "Ackerman", gpa: 1.1 },
  { firstName: "Thomas", lastName: "Beddow", gpa: 2.3 },
  { firstName: "Jackson", lastName: "Wolf", gpa: 4.0 },
  { firstName: "Jared", lastName: "Nguyen", gpa: 4.0 },
];

const gpaToLetter = (gpa) => {
  if (gpa >= 3.7) return "A";
  if (gpa >= 3.0) return "B";
  if (gpa >= 2.0) return "C";
  if (gpa >= 1.0) return "D";
  return "F";
};

const newArr = attendance.map(student => {
  const entry = {
    fullName: student.firstName + " " + student.lastName,
    averageGrade: gpaToLetter(student.gpa),
  }
  return entry;
});

console.log(newArr);


/* Hardest Challenge (Don't do this without completing harder challenges) */

/* Write a function that solves the "every number eventually equals 4" puzzle. The output should be
    an array of the path you took to make it equal four
    ex/ [11, 6, 3, 5, 4], [19, 8, 5, 4] or [252, 18, 8, 5, 4]
    For context: https://puzzling.stackexchange.com/questions/29137/every-number-eventually-equals-4 */

// assuming num < 1,000,000. Pattern holds with higher numbers but just requires more checks
// does not support leading zeros
const numberToWordsLength = (num) => {
  const words = {
    0: "zero", 1: "one", 2: "two", 3: "three", 4: "four",
    5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine",
    10: "ten", 11: "eleven", 12: "twelve", 13: "thirteen",
    14: "fourteen", 15: "fifteen", 16: "sixteen",
    17: "seventeen", 18: "eighteen", 19: "nineteen",
    20: "twenty"
  };

  return words[num].length;
};

const allPathsLeadToFour = (num) => {
  const path = []
  path.push(num)
  while (num !== 4) {
    num = numberToWordsLength(num);
    path.push(num);
  }
  return path;
};

// testing

// console.log(allPathsLeadToFour(7));