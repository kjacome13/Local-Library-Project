//this function should return an object containing the requested account's information
function findAccountById(accounts, id) {
  //using .find to locate and return the requested account info
  return accounts.find(account => account.id === id)
}

//this should return an array of all account sorted alphabetically by last name
function sortAccountsByLastName(accounts) {
  //using .sort to organize the account objects by last name
  return accounts.sort((accA, accB) => accA.name.last > accB.name.last ? 1:-1);
}

//this should return the number of times a certain account has borrowed any book
function getTotalNumberOfBorrows(account, books) {
  //creating a counter variable to be returned later
  let totalBorrowed = 0;
  //using .forEach i check each book and all their borrows transactions to find each instance of the requested account making a txn
  books.forEach(book => book.borrows.forEach(borrower => account.id === borrower.id ? totalBorrowed++ : null));
  //return the total count
  return totalBorrowed;
}

//this function should return an array of all books that are currently in possesion of requested account
function getBooksPossessedByAccount(account, books, authors) {
  //setting variable for accounts id for easy future reference
  const idNum = account.id;
  //creating empty array to hold all possessed book objects
  let possessedBooks = [];
  //creating a helper function to find the author by id number
  const findAuthor = (authors, id) => authors.find(author => author.id === id);
  //creating an array of books that are filtered by the borrowers id returned status 
  possessedBooks = books.filter(book => book.borrows[0].id === idNum && !book.borrows[0].returned);
    //.some(borrower => borrower.id === idNum && !borrower.returned));
  //creating the format for the possesed book objects and putting current book and author info inside
  possessedBooks = possessedBooks.map(book => {
    const authorInfo = findAuthor(authors, book.authorId);
    const possessedBook = {...book, author: authorInfo};
  //returning the book object to be put in the possessedBooks array
  return possessedBook;
  });
//returnin the finished array
return possessedBooks;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
