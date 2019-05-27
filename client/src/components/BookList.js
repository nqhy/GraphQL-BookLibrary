import React from 'react';
import { graphql } from 'react-apollo';

import { getBooksQuery } from '../query/queries';

class BookList extends React.Component {
  displayBooks() {
    var data = this.props.data;
    if(data.loading){
      return (<div>Loading Books ... </div>)
    } else {
      return data.books.map(book => {
        return(
          <li key={book.id}>{book.name}</li>
        )
      })
    }
  }

  render() {
    return (
      <div>
        <ul id="book-list">
          <li>Book Name</li>
          {this.displayBooks()}
        </ul>
      </div>
     );
  }
}

export default graphql(getBooksQuery)(BookList);
