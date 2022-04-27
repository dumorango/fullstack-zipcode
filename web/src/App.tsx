import "./App.css";
import { gql, useQuery } from "@apollo/client";
import { GetBooks } from "./__generated__/getBooks";

const getBooks = gql`
  query GetBooks {
    books {
      title
      author
      test
    }
  }
`;

function App() {
  const { data } = useQuery<GetBooks>(getBooks);

  return (
    <div className="App">
      <h1>Books</h1>
      {data?.books?.map((book) => (
        <div key={book.title}> {book.title}</div>
      ))}
    </div>
  );
}

export default App;
