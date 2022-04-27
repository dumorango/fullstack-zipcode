import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const placeHistoryVar = makeVar<
  {
    name: string;
    state: string;
    zipCode: string;
    countryCode: string;
  }[]
>([]);

export const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
});
