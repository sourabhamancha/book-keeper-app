import { gql } from "apollo-boost";

const getBooksQuery = gql`
  {
    books {
      id
      name
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      id
      name
    }
  }
`;

const addBookMutation = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`;

const getSingleBookQuery = gql`
  query Book($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          id
          name
        }
      }
    }
  }
`;

const addAuthorMutation = gql`
  mutation AddAuthor($name: String!, $age: Int!) {
    addAuthor(name: $name, age: $age) {
      id
      name
    }
  }
`;

export {
  getBooksQuery,
  getAuthorsQuery,
  addBookMutation,
  getSingleBookQuery,
  addAuthorMutation,
};
