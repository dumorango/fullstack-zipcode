import { ApolloServer, gql } from "apollo-server";
import { RESTDataSource } from "apollo-datasource-rest";

const typeDefs = gql`
  type Place {
    name: String!
    state: String!
  }

  type Query {
    findPlaces(countryCode: String!, zipCode: String!): [Place!]!
  }
`;
class ZippoAPI extends RESTDataSource {
  baseURL = "https://api.zippopotam.us";
  getPlace(countryCode: string, zipCode: string) {
    return this.get<{
      places: [
        {
          ["place name"]: string;
          state: string;
        }
      ];
    }>(`/${countryCode}/${zipCode}`);
  }
}

const resolvers = {
  Query: {
    findPlaces: async (
      _,
      { countryCode, zipCode }: { countryCode: string; zipCode: string },
      { dataSources: { zippoAPI } }: { dataSources: { zippoAPI: ZippoAPI } }
    ) => {
      const response = await zippoAPI.getPlace(countryCode, zipCode);
      return response.places.map((place) => ({
        name: place["place name"],
        state: place.state,
      }));
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      zippoAPI: new ZippoAPI(),
    };
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
