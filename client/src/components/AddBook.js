import React from 'react';
import {graphql, compose} from 'react-apollo';

import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../query/queries';


class AddBook extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      genre: '',
      authorId: '',
    }
  }

  displayAuthors(){
    const data = this.props.getAuthorsQuery;
    if(data.loading){
      return (<option disabled>Loading Authors</option>)
    } else {
      return data.authors.map(author => {
        return (<option key={author.id} value={author.id}>{author.name}</option>)
      })
    }
  }

  submitForm(e){
    e.preventDefault()
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId,
      },
      refetchQueries: [{query: getBooksQuery}]
    });
  }

  render() {
    return (
      <form onSubmit={this.submitForm.bind(this)}>
        <div>
          <label>Book Name:</label>
          <input type="text" onChange={(event) => this.setState({name: event.currentTarget.value})}/>
        </div>

        <div>
          <label>Genre:</label>
          <input type="text" onChange={(event) => this.setState({genre: event.currentTarget.value})}/>
        </div>

        <div>
          <label>Author:</label>
          <select onChange={(event) => this.setState({authorId: event.currentTarget.value})}>
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
     );
  }
}

export default compose(
  graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
  graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);
