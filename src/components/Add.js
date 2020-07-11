import React from "react";

// component
import AddBook from "./AddBook";
import AddAuthor from "./AddAuthor";

// sem-ui
import { Tab } from "semantic-ui-react";

function Add(props) {
  const panes = [
    {
      menuItem: { key: "books", icon: "book", content: "Add Book" },
      render: () => (
        <Tab.Pane>
          <AddBook />
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: "author", icon: "users", content: "Add Author" },
      render: () => (
        <Tab.Pane>
          <AddAuthor />
        </Tab.Pane>
      ),
    },
  ];

  const TabMenuItem = () => <Tab panes={panes} />;

  return <>{TabMenuItem()}</>;
}

export default Add;
