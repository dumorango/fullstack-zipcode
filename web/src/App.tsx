import "./App.css";
import { useState, useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
});

function App() {
  const [books, setBooks] = useState<any[]>([]);
  useEffect(() => {
    client
      .query({
        query: gql`
          query GetBooks {
            books {
              title
              author
            }
          }
        `,
      })
      .then((response) => {
        setBooks(response.data.books);
      });
  }, []);
  return (
    <div className="App">
      <h1>Books</h1>
      {books.map((book) => (
        <div key={book.title}> {book.title}</div>
      ))}
    </div>
  );
}

export default App;
