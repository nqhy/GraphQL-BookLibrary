import React from 'react';
import { graphql } from 'react-apollo';

import { getBookQuery } from '../query/queries';

class BookDetails extends React.Component {
  displayBookDetails(){
    const {book} = this.props.data;
    if (book) {
      return(
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All Books by this author: </p>
          <ul className="other-books">
            {book.author.books.map(item => {
              return <li key={item.id}>{item.name}</li>
            })}
          </ul>
        </div>
      )
    } else {
      return (
        <div>No book Selected</div>
      )
    }
  }
   
  render(){
    return (
      <div id="book-details">
        <p>Output book details here</p>
        {this.displayBookDetails()}
      </div>
     );
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId,
      }
    }
  }
})(BookDetails)