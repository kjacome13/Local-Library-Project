//Easy function, just gotta return the length of the 'books' array.
function getTotalBooksCount(books) {
  return books.length;
} 

//Same as above, returning length of 'accounts' array.
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

//Here I need to return total amount of books that have not been returned yet
function getBooksBorrowedCount(books) {
  //start by using reduce, setting a counter and defaulting it to 0.
  return books.reduce((counter, book) => {
    //here i am looking inside of the current book object. using a conditional operator, i am checking if the book has been returned or not.
    //if it has not then i add 1 to the counter. if it has been returned then it moves on. 
    !book.borrows[0].returned ? counter++ : null;
    //return the counter and repeat until all books have been checked.
    return counter;
  }, 0);
}

// here i need to return an ordered list containing the most common book genres.
function getMostCommonGenres(books) {
  //I start by creating the variable for the OL we will be returning
  //I use .reduce to loop and add objects to the empty array 
  const mostCommonGenres = books.reduce((genres, book) => {
    //here i am using .find to locate an object in the array whose name value matches the genre we are looking for and assigning a variable to that object.
    const genreObj = genres.find(currGenre => currGenre.name === book.genre);
    //here i am checking if 'genreObj' has a valid value set to it. if not then we create a new object and push that into the 'genres' array
    !genreObj ? genres.push({
      //setting the name to the current book genre
      name: book.genre,
      //setting the count to one since this is the first to be recorded in the array.
      count: 1,
      // if the object has a value that is valid (aka if the genre of the current book already exists) then we just add 1 to the counter of said genre.
    }) : genreObj.count++;
    //return the array and keep repeating until all book genres have been counted
    return genres;
    //setting the genres default to an empty array.
  }, []);
  //here i am sorting the array in descending order by the count amount
  mostCommonGenres.sort((genA, genB) => genB.count - genA.count);
  //here i am using splice to ensure only the top 5 are returned
  mostCommonGenres.splice(5);
  //returning the finished array :)
  return mostCommonGenres;
}


//here i need to return an OL with the books who have the most borrowed transactions
function getMostPopularBooks(books) {
  //I start by creating the array using the map method and setting the format for the book objects that will go in the array
  //I made set the name to be the title of the current book and the count to the length of the 'borrows' array in the current book object
  const popularBooks = books.map(book => {return { name: book.title, count: book.borrows.length}})
  //here i am sorting the array in descending order
  popularBooks.sort((bookA, bookB) => bookB.count - bookA.count);
  //here i use splice to ensure only the top 5 are returned 
  popularBooks.splice(5);
  //return the finished array :)
  return popularBooks;
}


//this function needs to return an OL of the top 5 authors.
function getMostPopularAuthors(books, authors) {
  //here i am making the list of popular authors by using .map method.
  const popularAuthors = authors.map(author => {
    //here i am creating the authors name variable
    const authorName = `${author.name.first} ${author.name.last}`;
    //here i am creating the list of books by current author using .filter method to find matching author ids.
    const booksBy = books.filter(book => book.authorId === author.id);
    //here i create the variable to hold the amount of times the current book has been borrowed using .reduce
    const borrows = booksBy.reduce((total, book) => total + book.borrows.length, 0);
    //here i am setting the format for the author's info and putting the current authors information in
    const authorInfo = {
      name: authorName,
      count: borrows,
    };
    //returning the object holding the current authors information.
    return authorInfo;
   })
   //here i sort the author objects in descending order
   popularAuthors.sort((authA, authB) => authB.count - authA.count);
   //use splice to ensure only the top 5 most popular are displayed
   popularAuthors.splice(5);
   //return the finished OL 
   return popularAuthors;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
