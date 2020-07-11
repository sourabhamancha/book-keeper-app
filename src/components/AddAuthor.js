import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { getAuthorsQuery, addAuthorMutation } from "../queries/queries";

// sem-ui
import { Button, Form } from "semantic-ui-react";

function AddAuthor() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const result = useQuery(getAuthorsQuery);
  const { loading, error, data } = result;

  const [
    addAuthor,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(addAuthorMutation, {
    update(proxy, result) {
      const data = proxy.readQuery({ query: getAuthorsQuery });
      data.authors = [result.data.addAuthor, ...data.authors];
      proxy.writeQuery({
        query: getAuthorsQuery,
        data,
      });
    },
  });

  if (loading || mutationLoading) return <p>Loading...</p>;
  if (error || mutationError) return <p>Error</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    addAuthor({
      variables: { name, age },
    });
    setName("");
    setAge(0);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Author Name</label>
          <input
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Age</label>
          <input
            value={age}
            type="number"
            onChange={(e) => setAge(parseInt(e.target.value))}
          />
        </Form.Field>

        <Button type="submit" basic color="teal">
          Add Author
        </Button>
      </Form>
    </div>
  );
}

export default AddAuthor;
