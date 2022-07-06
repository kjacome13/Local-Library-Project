//importing findAccountById function from accounts.js for later use
const { findAccountById } = require("./accounts");

//this function should return the object holding the requested author's information
function findAuthorById(authors, id) {
  //here i am using .find method to check each author and return the first one that matches the requested id
  return authors.find(author => author.id === id);
}

//this function is doing the same as the one above but instead with book objects.
function findBookById(books, id) {
  //use .find method to locate and return the first book that matches the id requested
  return books.find(book => book.id === id);
}

//this function should return an array with two arrays inside of it. the first one being an array 
//of book objects that have not been returned yet
//the second array should have book objects that have been returned.
function partitionBooksByBorrowedStatus(books) {
  //here i am creating the array of books that havent been returned using the .filter method.
  const outBooks = books.filter(book => book.borrows.some(trans => !trans.returned));
  //here i am doing the same as above but only adding the books that have been returned.
  const inBooks = books.filter(book => book.borrows.every(trans => trans.returned));
  //here i am creating the array that will be returned. I put both arrays created above inside of it in the order requestd.
  const allBooksStatus = [outBooks, inBooks];
  //returning the finished array
  return allBooksStatus;
}

//this function should return an array of all book borrowers with their information and the return status of the book
function getBorrowersForBook(book, accounts) {
  //here i am creating the array using the .map method
  const allBorrowers = book.borrows.map((txn) => {
    //here i am creating a variable to hold the current account information

    //i am using the imported helper function from the accounts.js file to locate the account
    const acct = findAccountById(accounts, txn.id);
    //was told not to import functions to use as 'helper functions' but they are also required to pass so i am commenting out the following line of code.
    //const acct = accounts.find(account => account.id === txn.id);

    //here i am setting the format for the transaction and putting the current txn information inside
    const newTxn = {
      ...txn,
      ...acct,
    };
    //returning the current txn info
    return newTxn;
  });
  //this ensures only 10 borrowers are displayed
  allBorrowers.splice(10);
  //returns finished array
  return allBorrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
