import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBooksQuery } from "../queries/queries";

// components
import BookDetails from "./BookDetails";

// sem-ui
import {
  Grid,
  Image,
  List,
  Segment,
  Card,
  Label,
  Input,
  Item,
} from "semantic-ui-react";

function BookList() {
  const [bookId, setBookId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(null);

  const result = useQuery(getBooksQuery);

  const { loading, error, data } = result;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

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
  console.log(data);
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    const dataFilter = (item) =>
      item.name.toLowerCase().match(searchQuery.toLowerCase()) && true;
    const searchFilteredData = data.books.filter(dataFilter);

    setFilteredData(searchFilteredData);
  };

  return (
    <>
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Segment raised>
              <Label color="teal" ribbon>
                Books
              </Label>
              <List animated verticalAlign="middle">
                <Input
                  fluid
                  icon="search"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
                {filteredData
                  ? filteredData &&
                    filteredData.map((book) => (
                      <Card
                        fluid
                        key={book.id}
                        onClick={(e) => setBookId(book.id)}
                      >
                        <Card.Content>
                          <Image
                            floated="right"
                            size="mini"
                            src={`https://react.semantic-ui.com/images/avatar/large/${
                              people[Math.floor(Math.random() * 10)]
                            }`}
                          />
                          <Card.Header>{book.name}</Card.Header>
                        </Card.Content>
                      </Card>
                    ))
                  : data.books &&
                    data.books.map((book) => (
                      <Card
                        fluid
                        key={book.id}
                        onClick={(e) => setBookId(book.id)}
                      >
                        <Card.Content>
                          <Image
                            floated="right"
                            size="mini"
                            src={`https://react.semantic-ui.com/images/avatar/large/${
                              people[Math.floor(Math.random() * 10)]
                            }`}
                          />
                          <Card.Header>{book.name}</Card.Header>
                        </Card.Content>
                      </Card>
                    ))}
              </List>
            </Segment>
          </Grid.Column>
          <Grid.Column>{bookId && <BookDetails id={bookId} />}</Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

export default BookList;
