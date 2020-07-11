import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getSingleBookQuery } from "../queries/queries";

// sem-ui
import { Card, Icon, Image, Label } from "semantic-ui-react";

function BookDetails(props) {
  const result = useQuery(getSingleBookQuery, { variables: { id: props.id } });

  const { loading, error, data } = result;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const { book } = data;

  const people = [
    "matthew.png",
    "steve.jpg",
    "molly.png",
    "jenny.jpg",
    "elliot.jpg",
    "daniel.jpg",
    "helen.jpg",
    "veronika.jpg",
    "elyse.png",
    "matt.jpg",
  ];

  return (
    <div style={{ marginLeft: "50px", position: "fixed" }}>
      <Card>
        <Image
          src={`https://react.semantic-ui.com/images/avatar/large/${
            people[Math.floor(Math.random() * 10)]
          }`}
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>
            {book.author.name}. {book.author.age}
          </Card.Header>
          <hr style={{ visibility: "hidden" }} />
          <Card.Meta>
            <span className="date">Book Title: {book.name}</span>
          </Card.Meta>
          <Card.Meta>
            <span className="date">Genre: {book.genre}</span>
          </Card.Meta>
          <Card.Description> </Card.Description>
        </Card.Content>
        {book.author.books.length > 0 ? (
          <Card.Content extra>
            <Label basic color="blue">
              <Icon name="book" color="blue" />
              {book.author.books.length - 1} other{" "}
              {book.author.books.length - 1 === 1 ? (
                <span>publication</span>
              ) : (
                <span>publications</span>
              )}{" "}
              by {book.author.name}
              <hr style={{ visibility: "hidden" }} />
              {book.author.books
                .filter((b) => b.id !== book.id)
                .map((book) => (
                  <li key={book.id}>{book.name}</li>
                ))}
            </Label>
          </Card.Content>
        ) : null}
      </Card>
    </div>
  );
}

export default BookDetails;
