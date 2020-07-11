import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
// sem-ui
import "semantic-ui-css/semantic.min.css";
import { Container, Icon } from "semantic-ui-react";
import { Grid, Menu } from "semantic-ui-react";

// components
import BookList from "./components/BookList";
import Add from "./components/Add";

// apollo client setup
const client = new ApolloClient({
  uri: "https://book-keeper-app-server.herokuapp.com/graphql",
});

function App() {
  return (
    <Container>
      <ApolloProvider client={client}>
        <Menu pointing secondary>
          <Menu.Item>
            <Icon name="book" color="teal" />
          </Menu.Item>
          <Menu.Item
            name="Book Keeper Application"
            active={true}
            color="teal"
          />
        </Menu>

        <Grid columns={2} divided style={{ marginTop: "20px" }}>
          <Grid.Row>
            <Grid.Column width={4}>
              <Add />
            </Grid.Column>
            <Grid.Column width={12}>
              <BookList />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </ApolloProvider>
    </Container>
  );
}

export default App;
