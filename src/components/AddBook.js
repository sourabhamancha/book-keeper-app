import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  getBooksQuery,
  getAuthorsQuery,
  addBookMutation,
} from "../queries/queries";

// sem-ui
import { Button, Form, Menu, Label, Tab } from "semantic-ui-react";

function AddBook() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const result = useQuery(getAuthorsQuery);
  const { loading, error, data } = result;

  const [
    addBook,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(addBookMutation, {
    update(proxy, result) {
      const data = proxy.readQuery({ query: getBooksQuery });
      data.books = [result.data.addBook, ...data.books];
      proxy.writeQuery({
        query: getBooksQuery,
        data,
      });
    },
    refetchQueries: [{ query: getBooksQuery }],
  });

  if (loading || mutationLoading) return <p>Loading...</p>;
  if (error || mutationError) return <p>Error</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({
      variables: { name, genre, authorId },
    });
    setName("");
    setGenre("");
    setAuthorId("");
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Book Name</label>
          <input
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Genre</label>
          <input
            value={genre}
            type="text"
            onChange={(e) => setGenre(e.target.value)}
          />
        </Form.Field>

        <Form.Field
          fluid
          label="Author"
          control="select"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
        >
          <option>Select Author</option>
          {data.authors &&
            data.authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
        </Form.Field>
        <Button type="submit" basic color="teal">
          Add Book
        </Button>
      </Form>
    </div>
  );
}

export default AddBook;
